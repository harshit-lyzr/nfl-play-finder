import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

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
  query?: string;
}

export const PlayTable = ({ plays, query }: PlayTableProps) => {
  const [expandedPlay, setExpandedPlay] = useState<number | null>(null);

  if (plays.length === 0) return null;

  const toggleExpand = (playId: number) => {
    setExpandedPlay(expandedPlay === playId ? null : playId);
  };

  return (
    <div className="mt-4 rounded-lg overflow-hidden bg-card border border-border">
      {/* Header */}
      <div className="bg-nfl-blue text-white p-4">
        <h3 className="font-semibold text-base">
          {query || 'Search Results'}
        </h3>
        <p className="text-sm text-white/80 mt-1">
          {plays.length} play{plays.length !== 1 ? 's' : ''} found. Click on a play to view details and NGS media links.
        </p>
      </div>

      {/* Table Header */}
      <div className="bg-nfl-blue text-white border-t border-white/20">
        <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-medium">
          <div className="col-span-1">Play</div>
          <div className="col-span-4">Description</div>
          <div className="col-span-1">Week</div>
          <div className="col-span-1">Season</div>
          <div className="col-span-1">Yards</div>
          <div className="col-span-1">Away</div>
          <div className="col-span-1">Home</div>
          <div className="col-span-2">Media</div>
        </div>
      </div>

      {/* Plays List */}
      <div className="divide-y divide-border">
        {plays.map((play, index) => (
          <div key={play.play_id} className="bg-background hover:bg-muted/50 transition-colors">
            <div className="grid grid-cols-12 gap-4 px-4 py-4 items-start">
              {/* Play Number */}
              <div className="col-span-1 flex items-start pt-1">
                <div className="w-8 h-8 rounded-full border-2 border-primary/30 bg-background flex items-center justify-center text-sm font-medium text-foreground">
                  {index + 1}
                </div>
              </div>

              {/* Description */}
              <div className="col-span-4">
                <div className="space-y-1">
                  <p className="text-sm text-foreground leading-relaxed">
                    ({play.formation}) {play.player_name} {play.play_description}
                  </p>
                  {play.touchdown === 1 && (
                    <Badge variant="secondary" className="text-xs bg-green-600 text-white border-0">
                      TOUCHDOWN
                    </Badge>
                  )}
                </div>
                {expandedPlay === play.play_id && (
                  <div className="mt-3 space-y-2 text-xs text-muted-foreground">
                    <p>Game Date: {play.game_date} | Play ID: {play.play_id}</p>
                    <p>Formation: {play.formation} | Alignment: {play.alignment}</p>
                    <p>Position: {play.position} | Play Type: {play.play_type}</p>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpand(play.play_id)}
                  className="mt-2 h-6 text-xs text-muted-foreground hover:text-foreground p-0"
                >
                  {expandedPlay === play.play_id ? (
                    <>
                      <ChevronUp className="h-3 w-3 mr-1" />
                      Less details
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3 w-3 mr-1" />
                      More details
                    </>
                  )}
                </Button>
              </div>

              {/* Week */}
              <div className="col-span-1">
                <Badge variant="secondary" className="text-xs bg-nfl-gray text-white border-0">
                  WK {play.week}
                </Badge>
              </div>

              {/* Season */}
              <div className="col-span-1">
                <Badge variant="secondary" className="text-xs bg-nfl-gray text-white border-0">
                  {play.season}
                </Badge>
              </div>

              {/* Yards */}
              <div className="col-span-1">
                <Badge variant="secondary" className="text-xs bg-nfl-gray text-white border-0">
                  {play.yards} YD
                </Badge>
              </div>

              {/* Away Team */}
              <div className="col-span-1">
                <Badge variant="secondary" className="text-xs bg-nfl-orange text-white border-0">
                  {play.opponent}
                </Badge>
              </div>

              {/* Home Team */}
              <div className="col-span-1">
                <Badge variant="secondary" className="text-xs bg-nfl-red text-white border-0">
                  {play.team}
                </Badge>
              </div>

              {/* Media Link */}
              <div className="col-span-2">
                {play.media_link ? (
                  <a
                    href={play.media_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-nfl-blue text-white text-xs font-medium hover:bg-nfl-blue/80 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Watch Video
                  </a>
                ) : (
                  <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground border-0">
                    No Media
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
