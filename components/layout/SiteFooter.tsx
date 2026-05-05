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


                <div className="footer-brand">
                    <Logo size = {50}/>
                    <p
                        style = {{
                            fontFamily: "FreightText Pro",
                            fontStyle: "italic",
                            transform: "skewX(5deg)",
                            fontSize: 20,
                            fontWeight: 400,
                            marginLeft: -10,
                        }}
                    >
                        Lunar Lab
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
        </footer>
    );
}