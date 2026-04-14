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
                <circle cx={size/2} cy={size/2} r= {size/2} fill="#F9E4C8" />

                {/* Inner circle */}
                <circle cx={size/2 + size/20} cy={size/2 - size/20} r={size/2 - size/20} fill="#323C50" textDecoration={"Lunar"}/>

                <text
                    x={size/2 + size/20 + 1}
                    y={size/2}
                    textAnchor="middle"
                    letterSpacing={size/15}
                    dominantBaseline="middle"
                    fontSize={size/7}
                    fontFamily={"FreightText Pro"}
                    fill="#F9E4C8"
                >
                    LUNAR
                </text>
            </svg>



        </div>
    );
}