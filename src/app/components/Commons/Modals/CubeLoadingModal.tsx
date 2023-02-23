import Lottie from "lottie-react";
import { generateLottieData } from "src/app/utils/helpers";
import * as cubeLoadingJson from 'src/assets/lotties/cube-loading.json';

export default function CubeLoadingModal() {
  return (
    <div className="align-center">
      <Lottie height='130px' animationData={generateLottieData(cubeLoadingJson)} />
      <div className='mt-4 fw-3'>Now Loading...</div>
    </div>
  )
}
