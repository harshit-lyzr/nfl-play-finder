import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ExternalLink } from 'lucide-react';

interface Play {
  play_id: number;
  season: number;
  week: number;
  game_date: string;
  team: string;
  opponent: string;
  player_name: string;
  position: string;
  play_type: string;
  yards: number;
  touchdown: number;
  interception: number;
  formation: string;
  alignment: string;
  play_description: string;
  media_link: string;
  schema_type: string;
  complexity: string;
  source: string;
}

interface PlayTableProps {
  plays: Play[];
}

export const PlayTable = ({ plays }: PlayTableProps) => {
  if (plays.length === 0) return null;

  return (
    <div className="mt-4 rounded-lg border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Week</TableHead>
              <TableHead>Player</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>vs</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Yards</TableHead>
              <TableHead>TD</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Media</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plays.map((play) => (
              <TableRow key={play.play_id}>
                <TableCell className="text-xs">{play.game_date}</TableCell>
                <TableCell className="text-xs">{play.week}</TableCell>
                <TableCell className="font-medium text-xs">{play.player_name}</TableCell>
                <TableCell className="text-xs">{play.team}</TableCell>
                <TableCell className="text-xs">{play.opponent}</TableCell>
                <TableCell className="text-xs">{play.play_type}</TableCell>
                <TableCell className="text-xs">{play.yards}</TableCell>
                <TableCell className="text-xs">{play.touchdown ? '✓' : ''}</TableCell>
                <TableCell className="text-xs max-w-xs truncate">{play.play_description}</TableCell>
                <TableCell>
                  {play.media_link && (
                    <a
                      href={play.media_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
