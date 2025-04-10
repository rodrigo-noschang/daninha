import { Button } from "@/components/ui/button";
import { PageHeader } from "./components/PageHeader";

export default function Home() {
  return (
    <div className="min-h-dvh">
      <PageHeader />

      <div className="text-center mt-8">
        <Button className="bg-green-700 hover:bg-green-800 active:bg-green-800">
          Cadastre os... fodentes 😩
        </Button>
      </div>
    </div>
  );
}
