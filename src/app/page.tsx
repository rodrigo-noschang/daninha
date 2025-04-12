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
import { FinalOfMatchSummary } from "./components/FinalOfMatchSummary";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { readFromCookies } from "@/utils/cookiesStorage";
import { IRankingDTO } from "./interfaces/entities/RankingDTO";

export default function Home() {
  const { players, everybodyGuessed, fullReset, losers } = usePlayersContext();

  const clientPlayers = players ?? [];
  const ranking = (readFromCookies("LOCAL_STORAGE_RANKING") ??
    []) as IRankingDTO[];

  const sortedRanking = ranking.sort((a, b) => b.victories - a.victories);

  return (
    <div className="min-h-dvh pb-20">
      <FinalOfMatchSummary />

      <PageHeader />

      <RegisterPlayersForm>
        <Button
          disabled={!!losers.length}
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
                <StandardButton className="w-full" disabled={!!losers.length}>
                  Qual foi o resultado do fodódromo?
                </StandardButton>
              </ResultsForm>
            </div>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <StandardButton className="w-full mt-40">
                Ver ranking
              </StandardButton>
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-main-bg pt-10 overflow-y-auto">
              <AlertDialogTitle>Ranking</AlertDialogTitle>

              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-placeholder text-center">
                        Nome
                      </TableHead>
                      <TableHead className="text-placeholder text-center">
                        V
                      </TableHead>
                      <TableHead className="text-placeholder text-center">
                        D
                      </TableHead>
                      <TableHead className="text-placeholder text-center">
                        VP
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {sortedRanking.map((sortedRank) => (
                      <TableRow key={sortedRank.id}>
                        <TableCell className="text-center">
                          {sortedRank.player.name}
                        </TableCell>
                        <TableCell className="text-center">
                          {sortedRank.victories}
                        </TableCell>
                        <TableCell className="text-center">
                          {sortedRank.defeats}
                        </TableCell>
                        <TableCell className="text-center">
                          {sortedRank.totalLivesLost}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between mt-3">
                <AlertDialogCancel className="text-black">
                  Fechar
                </AlertDialogCancel>
              </div>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-content-box-bg m-auto mt-8 w-full hover:bg-gray-600">
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
