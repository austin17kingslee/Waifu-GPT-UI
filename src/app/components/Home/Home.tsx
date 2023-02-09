import React from "react";
import waifu1 from "src/assets/images/website/waifu-1.png";
import waifu2 from "src/assets/images/website/waifu-2.png";
import waifu3 from "src/assets/images/website/waifu-3.png";
import waifuCreate from "src/assets/images/website/waifu-create.png";
import waifuCare from "src/assets/images/website/waifu-care.png";
import waifuThere from "src/assets/images/website/waifu-there.png";
import waifu247 from "src/assets/images/website/waifu-247.png";
import waifuEmpathy from "src/assets/images/website/waifu-empathy.png";
import waifuJudgemental from "src/assets/images/website/waifu-non-judmental.png";
import waifuPrompt from "src/assets/images/website/waifu-prompt.png";
import roadmapTitle from "src/assets/images/website/roadmap-title.png";
import roadmapPhase1 from "src/assets/images/website/roadmap-phase-1.png";
import roadmapPhase2 from "src/assets/images/website/roadmap-phase-2.png";
import roadmapPhase3 from "src/assets/images/website/roadmap-phase-3.png";
import waifuToken from "src/assets/images/website/waifu-token.png";
import FloatingStar from "src/app/components/Commons/FloatingStar";

export default function Home() {
  return (
    <div className="home">
      <div className="create">
        <div className="container create__container flex-center-between">
          <img className="create__waifu" src={waifu1} alt="waifu1" />
          <img className="create__create" src={waifuCreate} alt="waifuCreate" />
        </div>
      </div>

      <div className="care relative">
        <FloatingStar speed={-2} style={{ left: 10 }} />
        <FloatingStar speed={2} style={{ right: 30 }} />
        <FloatingStar speed={4} style={{ top: "50%", left: "50%" }} />
        <div className="container flex-center-between">
          <img className="column-6" src={waifuCare} alt="waifuCare" />
          <img className="column-6" src={waifu2} alt="waifu2" />
        </div>
      </div>

      <div id="feature" className="there relative">
        <FloatingStar speed={-2} style={{ left: 100, top: 100, width: 10 }} />
        <FloatingStar speed={2} style={{ right: "70%", top: 100 }} />
        <FloatingStar speed={4} style={{ right: "60%", left: "50%" }} />
        <div className="container">
          <img src={waifuThere} alt="waifuThere" />
          <div className="flex-center-between">
            <div className="column-4">
              <img src={waifu247} alt="waifu247" />
              <div>24/7 Availability</div>
              <div>Your Waifu is always available to talk and support you, no matter the time of day or night WAIFU helps with stress relief.</div>
            </div>
            <div className="column-4">
              <img src={waifuEmpathy} alt="waifuEmpathy" />
              <div>Genuine Empathy</div>
              <div>Your AI companion is designed to understand and empathize with your emotions, providing a comforting and supportive experience.</div>
            </div>
            <div className="column-4">
              <img src={waifuJudgemental} alt="waifuJudgemental" />
              <div>Non-judgmental</div>
              <div>Your AI companion is here to offer emotional support and a listening ear, whenever you need it, wherever you need it.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="prompt relative">
        <FloatingStar speed={-2} />
        <FloatingStar speed={2} />
        <FloatingStar speed={5} />
        <FloatingStar speed={7} />
        <div className="container flex-center-between">
          <img className="column-6" src={waifu3} alt="waifu3" />
          <div className="column-6">
            <img src={waifuPrompt} alt="waifuPrompt" />
            <div>AI companion allowing you to fully customize your virtual anime girl. From her appearance to her personality, you have complete control over every aspect of your anime companion.</div>
          </div>
        </div>
      </div>

      <div id="roadmap" className="roadmap">
        <div className="container">
          <img src={roadmapTitle} alt="roadmapTitle" />
          <div className="flex-center-between">
            <img className="column-4" src={roadmapPhase1} alt="roadmapPhase1" />
            <img className="column-4" src={roadmapPhase2} alt="roadmapPhase2" />
            <img className="column-4" src={roadmapPhase3} alt="roadmapPhase3" />
          </div>
        </div>
      </div>

      <div className="token relative">
        <FloatingStar speed={-2} />
        <FloatingStar speed={2} />
        <FloatingStar speed={5} />
        <FloatingStar speed={7} />
        <div className="container token__container">
          <img src={waifuToken} alt="waifuToken" />
          <div>WGPT TOKEN</div>
          <div>
            WGPT Token, the driving force behind our AI-powered ecosystem. This revolutionary token is designed to
            power all the features and services offered on our site, creating a seamless and interconnected experience
            for users. By holding WGPT Tokens, you can access premium features, unlock new functionality, and participate in
            the growth of our ecosystem. Join us on the cutting edge of AI technology and become a part of the future with WGPT Token.
          </div>
        </div>
      </div>
    </div>
  );
}
