import { useNavigate } from "react-router-dom";
import { BackButton } from "../../ui/BackButton/BackButton";

export default function FinancialLifeBackButton() {
  const navigate = useNavigate();
  return (
    <BackButton
      label="Voltar à vida financeira"
      onClick={() => navigate("/vida-financeira")}
    />
  );
}