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

const beVietnam = Be_Vietnam_Pro({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
});

export default function SiteFooter() {
    return (
        <footer

                style={{
                padding: "60px 80px",
                borderTop: "1px solid #ddd",
                marginTop: 80,
                color: "#323C50",
                height: 301,

                backgroundImage: "url('/astronaut2.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}

        >
            <div
                className={beVietnam.className}
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {/* LEFT: Contact */}
                <div>

                    <h3
                        style={{
                            fontFamily: "FreightText Pro",
                            fontStyle: "italic",
                            fontSize: 30,
                            fontWeight: 400,
                            marginBottom: 30,
                            marginTop: 20
                        }}
                    >
                        Contact us
                    </h3>

                    <p style={{
                        fontFamily: "Be Vietnam Pro",
                        fontWeight: 400,
                        fontSize: 19
                    }}>
                        lunarlab@gmail.com
                    </p>
                    <p style={{
                        fontFamily: "Be Vietnam Pro",
                        fontWeight: 400,
                        fontSize: 19
                    }}>
                        000-000-0000
                    </p>
                </div>


                <div
                    style={{
                        maxWidth: 1200,
                        paddingTop: 100,
                        paddingLeft: 50,
                        display: "flex",
                        columnGap: 0,
                        flexDirection: "row",
                    }}
                >
                    <Logo size = {50}/>
                    <p
                        style = {{
                            fontFamily: "FreightText Pro",
                            fontStyle: "italic",
                            transform: "skewX(5deg)",
                            fontSize: 20,
                            fontWeight: 400,
                            marginLeft: -20,
                            marginTop: -3,
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