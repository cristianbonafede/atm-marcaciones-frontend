import SubmenuCards from "../../components/inicio/submenu-cards";
import { useParams } from "react-router-dom";

const SubmenuPage = () => {
  const { parent } = useParams();
  return <SubmenuCards parentLabel={parent} />;
};

export default SubmenuPage;
