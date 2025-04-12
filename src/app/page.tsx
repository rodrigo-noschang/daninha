import { PageHeader } from "./components/PageHeader";
import { RegisterPlayersButton } from "./components/RegisterPlayersButton";
import { RegisterPlayersForm } from "./components/RegisterPlayersForm";

export default function Home() {
  return (
    <div className="min-h-dvh">
      <PageHeader />

      <RegisterPlayersForm>
        <RegisterPlayersButton />
      </RegisterPlayersForm>
    </div>
  );
}
