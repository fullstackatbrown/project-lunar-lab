/*export default function SiteFooter() {
    return (
      <footer style={{ padding: 24, borderTop: "1px solid #eee" }}>
        <p>© {new Date().getFullYear()} LUNAR Lab</p>
        <div style={{ marginTop: 8 }}>
          <a href="#" target="_blank">YouTube</a> |{" "}
          <a href="#" target="_blank">X</a>
        </div>
      </footer>
    );
  }
  */

import { Be_Vietnam_Pro } from "next/font/google";
import { FaYoutube, FaXTwitter } from "react-icons/fa6";
import { BsSubstack } from "react-icons/bs";
import Logo from "@/components/logo";
import '@/app/globals.css';

const beVietnam = Be_Vietnam_Pro({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
});

export default function SiteFooter() {
    return (
        <footer
            className={"footer"}
        >
            <div className={`${beVietnam.className} footer-row`}>
                {/* LEFT: Contact */}
                <div>

                    <h3 style={{fontSize: 40}}> Contact us </h3>

                    <p>
                        lunarlab@gmail.com
                    </p>

                    <p>
                        000-000-0000
                    </p>
                </div>


                {/* RIGHT: Icons */}
                <div style={{ display: "flex", gap: 28, alignItems: "center" }}>

                    <a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaYoutube size={26} />
                    </a>

                    <a
                        href="https://x.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaXTwitter size={26}/>
                    </a>
                    <a
                        href = "https://substack.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    <BsSubstack size = {26}/>
                    </a>

                </div>
            </div>

            {/* LOGO — independent. Tune LOGO_LEFT / LOGO_TOP without affecting the text. */}
            <div
                style={{
                    position: "absolute",
                    left: "calc(50% - -5px)",  /* 50px logo width + 10px gap left of footer center (astronaut center) */
                    top: "66%",                /* vertically centered = parallel to astronaut middle */
                    transform: "translateY(-50%)",
                }}
            >
                <Logo size={50} />
            </div>

            {/* "Lunar Lab" TEXT — independent. Tune LEFT / TOP without affecting the logo. */}
            <p
                style={{
                    position: "absolute",
                    left: "calc(50% - -37px)",   /* adjacent to logo's right edge */
                    top: "60%",
                    transform: "translateY(-50%) skewX(5deg)",
                    fontFamily: "FreightText Pro",
                    fontStyle: "italic",
                    fontSize: 20,
                    fontWeight: 400,
                }}
            >
                Lunar Lab
            </p>
        </footer>
    );
}