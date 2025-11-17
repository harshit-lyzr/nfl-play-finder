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
    <div className="w-full max-w-[70%] mt-6 rounded-2xl overflow-hidden bg-card border border-border/50 shadow-lg animate-slide-up">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-white p-5">
        <h3 className="font-bold text-lg">
          {query || 'Search Results'}
        </h3>
        <p className="text-sm text-white/90 mt-1">
          {plays.length} play{plays.length !== 1 ? 's' : ''} found. Click on a play to view details and NGS media links.
        </p>
      </div>

      {/* Table Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/5 border-t border-border/30">
        <div className="grid grid-cols-12 gap-4 px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
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
      <div className="divide-y divide-border/50">
        {plays.map((play, index) => (
          <div key={play.play_id} className="bg-background hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent transition-all duration-300 group">
            <div className="grid grid-cols-12 gap-4 px-5 py-4 items-start">
              {/* Play Number */}
              <div className="col-span-1 flex items-start pt-1">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center text-sm font-bold text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
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
                    <Badge variant="secondary" className="text-xs font-semibold bg-gradient-to-r from-green-600 to-green-500 text-white border-0 shadow-sm">
                      🏈 TOUCHDOWN
                    </Badge>
                  )}
                </div>
                {expandedPlay === play.play_id && (
                  <div className="mt-3 p-3 rounded-lg bg-muted/50 space-y-2 text-xs text-muted-foreground border border-border/50 animate-fade-in">
                    <p><span className="font-semibold">Game Date:</span> {play.game_date} | <span className="font-semibold">Play ID:</span> {play.play_id}</p>
                    <p><span className="font-semibold">Formation:</span> {play.formation} | <span className="font-semibold">Alignment:</span> {play.alignment}</p>
                    <p><span className="font-semibold">Position:</span> {play.position} | <span className="font-semibold">Play Type:</span> {play.play_type}</p>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpand(play.play_id)}
                  className="mt-2 h-7 text-xs text-primary hover:text-primary hover:bg-primary/10 px-2 transition-all duration-300"
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
                <Badge variant="secondary" className="text-xs font-medium bg-gradient-to-r from-slate-600 to-slate-500 text-white border-0 shadow-sm">
                  WK {play.week}
                </Badge>
              </div>

              {/* Season */}
              <div className="col-span-1">
                <Badge variant="secondary" className="text-xs font-medium bg-gradient-to-r from-slate-600 to-slate-500 text-white border-0 shadow-sm">
                  {play.season}
                </Badge>
              </div>

              {/* Yards */}
              <div className="col-span-1">
                <Badge variant="secondary" className="text-xs font-medium bg-gradient-to-r from-slate-600 to-slate-500 text-white border-0 shadow-sm">
                  {play.yards} YD
                </Badge>
              </div>

              {/* Away Team */}
              <div className="col-span-1">
                <Badge variant="secondary" className="text-xs font-bold bg-gradient-to-r from-orange-600 to-orange-500 text-white border-0 shadow-sm">
                  {play.opponent}
                </Badge>
              </div>

              {/* Home Team */}
              <div className="col-span-1">
                <Badge variant="secondary" className="text-xs font-bold bg-gradient-to-r from-red-600 to-red-500 text-white border-0 shadow-sm">
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
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary/90 text-white text-xs font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Watch Video
                  </a>
                ) : (
                  <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground border border-border/50">
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
