import SubmenuCards from "../../components/inicio/submenu-cards";
import { useParams } from "react-router-dom";

const SubmenuPage = () => {
  const { parent } = useParams();
  debugger
  return <SubmenuCards parentPath={parent} />;
};

export default SubmenuPage;
