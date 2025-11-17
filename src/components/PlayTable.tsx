import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
          <div className="col-span-3">Description</div>
          <div className="col-span-1">Down</div>
          <div className="col-span-1">Quarter</div>
          <div className="col-span-1">Week</div>
          <div className="col-span-1">Season</div>
          <div className="col-span-1">Away</div>
          <div className="col-span-1">Home</div>
          <div className="col-span-2">Media Link</div>
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
              <div className="col-span-3">
                <p className="text-sm text-foreground leading-relaxed">
                  {play.play_description}
                </p>
                {expandedPlay === play.play_id && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-muted-foreground">
                      Game ID: {play.game_date} | Play ID: {play.play_id}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs bg-nfl-gray/20 border-nfl-gray/30">
                        NGS: Truck
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-nfl-gray/20 border-nfl-gray/30">
                        NGS: Sideline
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-nfl-gray/20 border-nfl-gray/30">
                        NGS: Endzone
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-nfl-gray/20 border-nfl-gray/30">
                        NGS: Endzone2
                      </Badge>
                    </div>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpand(play.play_id)}
                  className="mt-2 h-6 text-xs text-muted-foreground hover:text-foreground"
                >
                  {expandedPlay === play.play_id ? (
                    <>
                      <ChevronUp className="h-3 w-3 mr-1" />
                      Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3 w-3 mr-1" />
                      More
                    </>
                  )}
                </Button>
              </div>

              {/* Down */}
              <div className="col-span-1">
                <Badge variant="secondary" className="text-xs bg-nfl-gray text-white border-0">
                  1st
                </Badge>
              </div>

              {/* Quarter */}
              <div className="col-span-1">
                <Badge variant="secondary" className="text-xs bg-nfl-gray text-white border-0">
                  Q2
                </Badge>
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
                  >
                    <Badge variant="secondary" className="text-xs bg-nfl-gray text-white border-0 cursor-pointer hover:bg-nfl-gray/80">
                      Media Portal
                    </Badge>
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
