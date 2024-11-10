import Image from "next/image";

const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Image
    src="/readme/logo-big.png"
    alt="Amixtra Logo"
    width="40"
    height="40"
  />
)

export default Logo
