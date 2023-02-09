import React, { useEffect, MouseEvent } from "react";
import { selectGlobal, useAppSelector } from "src/app/redux";
import { Modal } from "src/app/types/types";
import { useDispatch } from "react-redux";
import { closeModal } from "src/app/redux/global/globalSlice";
import _ from "lodash";

export default function GlobalModals() {
  const dispatch = useDispatch();
  const { modals } = useAppSelector(selectGlobal);

  useEffect(() => {
    const currentActive = document.getElementsByClassName('modal__overlay--active').length;

    if (currentActive > 0) {
      document.querySelector("body")!.classList.add("hidden-body");
    }

    document.addEventListener("keydown", handleOnEscPress, false);

    return () => {
      document.querySelector('body')!.classList.remove("hidden-body");
      document.removeEventListener("keydown", handleOnEscPress, false);
    }
  }, [modals]); // eslint-disable-line

  function handleOnEscPress(e: any) {
    if (e.keyCode === 27) {
      const activeModals = _.orderBy(Object.values(modals).filter((modal: Modal) => modal.active), "layer");
      const currentModal = activeModals[activeModals.length - 1];
      handleClose(currentModal);
    }
  }

  function closeCurrentActiveModal(e: MouseEvent, modal: Modal) {
    if (e.target !== e.currentTarget) return;
    handleClose(modal);
  }

  function handleClose(modal: Modal) {
    if (!modal) return;
    if (modal.onClose) modal.onClose();
    dispatch(closeModal(modal.key));
  }

  return (
    <div className="modal">
      {Object.values(modals).map((modal: Modal) => {
        const close = () => handleClose(modal);
        return (
          <div
            key={modal.key}
            className={`modal__overlay ${modal.active ? "modal__overlay--active" : ""} nice-scroll`}
            style={modal.layer ? { zIndex: modal.layer + 100 } : undefined}
            onMouseDown={(e) => closeCurrentActiveModal(e, modal)}
          >
            <div className="modal__wrapper">
              <div className="pb-6">
                <div
                  className={`modal__content ${modal.className ?? ''}`}
                  style={modal.width ? { width: modal.width } : undefined}
                >
                  {modal.hideXBtn !== true && (
                    <div className="modal__content-x" onClick={close}>×</div>
                  )}
                  {modal.title !== undefined && (
                    <div className="modal__content-title">{modal.title}</div>
                  )}
                  <div className="basic-modal">
                    <div className="basic-modal__content">
                      {modal.content}
                    </div>
                    {modal.hidePanel !== true && (
                      <div className={`basic-modal__panel`}>
                        <div className={`btn ${!!modal.onSubmit && 'btn--gray'}`} onClick={close}>
                          {modal.closeText ?? 'Close'}
                        </div>
                        {!!modal.onSubmit && (
                          <div className={`btn ml-4 ${modal.isSubmitDisabled ? 'disabled' : ''}`}
                               onClick={modal.onSubmit}>
                            {modal.submitText ?? 'Confirm'}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
}
