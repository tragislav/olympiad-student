import { useParams } from "react-router-dom";

function ChangePassword() {
  const { uid } = useParams();
  const params = useParams();
  return (
    <div>
      {uid}
      {console.log(params)}
    </div>
  );
}

export default ChangePassword;
