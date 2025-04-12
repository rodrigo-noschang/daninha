"use client";

import { usePlayersContext } from "@/contexts/players-context";
import { PageHeader } from "./components/PageHeader";
import { RegisterPlayersForm } from "./components/RegisterPlayersForm";
import { PlayersListWithLives } from "./components/PlayersListWithLives";
import { Button } from "@/components/ui/button";
import { PlayersGuesses } from "./components/PlayersGuesses";
import { StandardButton } from "./components/StandardButton";
import { ResultsForm } from "./components/ResultsForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Home() {
  const { players, everybodyGuessed, fullReset } = usePlayersContext();

  const clientPlayers = players ?? [];

  return (
    <div className="min-h-dvh pb-20">
      <PageHeader />

      <RegisterPlayersForm>
        <Button
          className={
            "bg-button-green rounded-lg hover:bg-button-green-hover active:bg-button-green-hover w-full mt-4"
          }
        >
          Cadastre os... fodentes 😩
        </Button>
      </RegisterPlayersForm>

      {!!clientPlayers.length && (
        <div>
          <PlayersListWithLives />
          <PlayersGuesses />

          {everybodyGuessed && (
            <div className="mt-8">
              <ResultsForm>
                <StandardButton className="w-full">
                  Qual foi o resultado do fodódromo?
                </StandardButton>
              </ResultsForm>
            </div>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-content-box-bg m-auto mt-40 w-full hover:bg-gray-600">
                Reiniciar a porra toda
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-main-bg pt-10 overflow-y-auto">
              <AlertDialogTitle>
                Deseja mesmo reiniciar a porra toda?
              </AlertDialogTitle>

              <div className="flex justify-between mt-3">
                <AlertDialogCancel className="text-black">
                  Se arrependi
                </AlertDialogCancel>

                <AlertDialogAction onClick={fullReset}>
                  Reiniciar
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}
