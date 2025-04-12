"use client";

import { usePlayersContext } from "@/contexts/players-context";
import { PageHeader } from "./components/PageHeader";
import { RegisterPlayersForm } from "./components/RegisterPlayersForm";
import { PlayersListWithLives } from "./components/PlayersListWithLives";
import { Button } from "@/components/ui/button";
import { PlayersGuesses } from "./components/PlayersGuesses";
import { StandardButton } from "./components/StandardButton";

export default function Home() {
  const { players, everybodyGuessed } = usePlayersContext();

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
              <StandardButton>
                Qual foi o resultado do fodódromo?
              </StandardButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
