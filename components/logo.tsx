import {bold} from "next/dist/lib/picocolors";

export default function Logo({ size = 40 }: { size?: number }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Outer circle */}
                <circle cx={size/2} cy={size/2} r= {size/2} className={"logo-outer-circle"} />

                {/* Inner circle */}
                <circle cx={size/2 + size/20} cy={size/2 - size/20} r={size/2 - size/20} className={"logo-inner-circle"} textDecoration={"Lunar"}/>

                <text
                    x={size/2 + size/20 + 1}
                    y={size/2}
                    textAnchor="middle"
                    letterSpacing={size/16}
                    dominantBaseline="middle"
                    fontSize={size/7}
                    fontStyle={"bold"}
                    fontFamily={"FreightText Pro"}
                    className={"logo-text"}
                >
                    LUNAR
                </text>
            </svg>



        </div>
    );
}