export const Box = ({ children, flexDirection = "row", justifyContent = "space-between", border = null, overflow = 'hidden', padding = '0px', margin = '0px', height }) => (
    <div
        style={{
            display: "flex",
            flexDirection,
            justifyContent,
            border,
            overflow,
            padding,
            margin,
            height
        }}
    >
        {children}
    </div>
);
