import { useNavigate } from "@solidjs/router";
import Icon from "../../components/icon";

const Apage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Icon style={{ color: "red" }} type="&#xe6c8;" />
      <button
        onClick={() => {
          navigate("/b");
        }}
      >
        increment
      </button>
    </div>
  );
};

export default Apage;
