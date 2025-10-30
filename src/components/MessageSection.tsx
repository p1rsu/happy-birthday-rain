import { useState } from "react";
import {
  Heart,
  Maximize2,
  Minimize2,
  Star,
  Sparkles,
  Gift,
  Trophy,
  Zap,
  Gamepad2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const MessageSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const letters = [
    {
      icon: (
        <Heart
          className="text-primary animate-pulse"
          size={48}
          fill="currentColor"
        />
      ),
      title: "Level Up Message",
      content: (
        <>
          <p className="font-sans text-lg md:text-xl text-foreground leading-relaxed">
            I just want to say ang tanda mo na!!!
          </p>

          <p className="font-sans text-lg md:text-xl text-foreground leading-relaxed">
            But really though, I wish you all the best and I do hope you enjoy
            your day! Thank you for reserving this time sa special occasion mo,
            I promise it will be fast lang. 💕.
          </p>
        </>
      ),
      achievement: {
        title: "ACHIEVEMENT UNLOCKED",
        name: "The Most Cutie Person",
        detail: "Rarity: Legendary ✨",
      },
    },
    {
      icon: (
        <Star
          className="text-secondary animate-pulse"
          size={48}
          fill="currentColor"
        />
      ),
      title: "You're Amazing",
      content: (
        <>
          <p className="font-sans text-lg md:text-xl text-foreground leading-relaxed">
            We don't have that much{" "}
            <span className="text-primary font-semibold">memories</span> yet but
            I hope this greeting still counts
          </p>

          <p className="font-sans text-lg md:text-xl text-foreground leading-relaxed">
            <span className="font-game text-lg text-muted-foreground mb-4">
              Happy Birthday Rain
            </span>
            .
          </p>

          <p className="font-sans text-lg md:text-xl text-foreground leading-relaxed">
            Let's Celebrate you!
          </p>
        </>
      ),
      achievement: {
        title: "SPECIAL STATS",
        name: "Kindness: MAX • Charm: MAX • Awesomeness: INFINITE",
        detail: null,
      },
    },
    {
      icon: (
        <Sparkles
          className="text-accent animate-pulse"
          size={48}
          fill="currentColor"
        />
      ),
      title: "Grateful For You",
      content: (
        <>
          <p className="font-sans text-lg md:text-xl text-foreground leading-relaxed">
            <span className="text-primary font-semibold">Just a heads up,</span>{" "}
            Hindi ako marunong ng ganto so you'll have to excuse me and my
            birthday greeting hehe ツ
          </p>
        </>
      ),
      achievement: {
        title: "BONUS BUFF ACTIVE",
        name: "Blessing of Happiness",
        detail: "Duration: Lifetime",
      },
    },
    {
      icon: (
        <Zap
          className="text-secondary animate-pulse"
          size={48}
          fill="currentColor"
        />
      ),
      title: "Your Journey",
      content: (
        <>
          <p className="font-sans text-lg md:text-xl text-foreground leading-relaxed">
            Happy Birthday{" "}
            <span className="text-primary font-semibold">Rain</span> , again,
            Sorry in advance that this is too simple T^T , Suwiii po.... sabi
            sa'yo' something small lang eeee kaya don't expect muchhhh, I don't
            know if mahaba ba itong message pero please bear with pirsu, Thank
            youuuuuu Mwaaaaa 💋
          </p>
        </>
      ),
      achievement: {
        title: "QUEST PROGRESS",
        name: "Life Adventure: Level 25+ Unlocked!",
        detail: null,
      },
    },
    {
      icon: (
        <Heart
          className="text-accent animate-pulse"
          size={48}
          fill="currentColor"
        />
      ),
      title: "Our Moments",
      content: (
        <>
          <p className="font-sans text-lg md:text-xl text-foreground leading-relaxed">
            Happy <span className="text-primary font-semibold">22nd</span>{" "}
            Birthday bebe, I hope ngayong 22 na you, nagawa mo na ring iwan ang
            bad memories mo para gawa ka ulit ng bago char! HASHASHASHAH
          </p>

          <p className="font-sans text-lg md:text-xl text-foreground leading-relaxed">
            Thank you for the games even with our countless tilted games, you
            still let me play with uuuuu! also, Thank you for the movie time
            while working ganern, I really really enjoy your company, I could
            last like this forever! 💝
          </p>
        </>
      ),
      achievement: {
        title: "LEGENDARY TITLE",
        name: "Heart of Gold",
        detail: "Rarity: Mythical",
      },
    },
    {
      icon: (
        <Star
          className="text-primary animate-pulse"
          size={48}
          fill="currentColor"
        />
      ),
      title: "Special Bond",
      content: (
        <>
          <p className="font-sans text-lg md:text-xl text-foreground leading-relaxed">
            <span className="text-secondary font-semibold">Thank you</span> for
            being true and very mabait to me!(Syempre dapat sa'kin lang,
            masungit sa iba) chariz HAHAHAHHAHA, just stay humble bebe. ang wish
            ko lang ay sana maging smooth lang yung journey mo on your way to
            your success and goals. and, I really hope that u win your silent
            battles na you're not vocal about, I believe in youuuu! Dito lang
            daddy para samahan ka, I'm always rooting for youuu! Best wishes for
            you and kay tita, snowy, siopao and arf arf(kasi i forgot his name
            HAHAHAHAHHAA)!
          </p>

          <p className="font-sans text-lg md:text-xl text-foreground leading-relaxed">
            Here's to more{" "}
            <span className="text-secondary font-semibold">
              co-op adventures
            </span>
            , late-night gaming sessions, and creating memories that no respawn
            could ever replace. 🎮💫
          </p>
        </>
      ),
      achievement: {
        title: "COMPANION UNLOCKED",
        name: "Legendary Duo",
        detail: "Synergy: Perfect Match",
      },
    },
    {
      icon: (
        <Trophy
          className="text-primary animate-pulse"
          size={48}
          fill="currentColor"
        />
      ),
      title: "Grateful Heart",
      content: (
        <>
          <p className="font-sans text-lg md:text-xl text-foreground leading-relaxed">
            Thank you for lending me your full 5 minutes of your time, sorry
            kung hindi ko masyadong napaghandaan Rain! Nahihiya rin talaga ako
            ibigay sa'yo 'to but I think you deserved this kind of thing!
          </p>

          <p className="font-sans text-lg md:text-xl text-foreground leading-relaxed">
            May your birthday be filled with as much{" "}
            <span className="text-primary font-semibold">joy</span> as you bring
            to others! 💝
          </p>
        </>
      ),
      achievement: {
        title: "FRIENDSHIP BONUS",
        name: "Connection Established",
        detail: "Bond Level: Maximum",
      },
    },
    {
      icon: (
        <Gamepad2
          className="text-secondary animate-pulse"
          size={48}
          fill="currentColor"
        />
      ),
      title: "Until Next Time",
      content: (
        <>
          <p className="font-sans text-lg md:text-xl text-foreground leading-relaxed">
            I'll be ending this na, marami pa kong gusto sabihin pero baka sa
            invoice nalang. I really hope na napasaya kita kahit kaunti with
            this simple thing that I did! Once again, Happy Birthday and Thank
            you for being here with meee! sana di you maumay kay daddeeeh
            HAHASAHSAHASHASH jejeje Kaya what if? raro na us?(if you're free
            lang) HSAHASHAHAH
          </p>

          <p className="font-sans text-lg md:text-xl text-foreground leading-relaxed">
            May your birthday be filled with as much{" "}
            <span className="text-primary font-semibold">joy</span> as you bring
            to others! 💝
          </p>
        </>
      ),
      achievement: {
        title: "MULTIPLAYER MODE",
        name: "Ready for Co-op",
        detail: "Status: Online",
      },
    },
    {
      icon: (
        <Gift
          className="text-primary animate-pulse"
          size={48}
          fill="currentColor"
        />
      ),
      title: "Closing Message",
      content: (
        <>
          <p className="font-sans text-lg md:text-xl text-foreground leading-relaxed">
            As you blow out your candles and make a wish, know that you deserve
            <span className="text-primary font-semibold">
              {" "}
              all the happiness
            </span>{" "}
            in the world.
          </p>

          <p className="font-sans text-lg md:text-xl text-foreground leading-relaxed">
            May this year bring you{" "}
            <span className="text-secondary font-semibold">endless joy</span>,{" "}
            <span className="text-accent font-semibold">
              amazing adventures
            </span>
            , and all the{" "}
            <span className="text-primary font-semibold">love</span> your heart
            can hold.
          </p>

          <div className="pt-6 border-t-2 border-primary/20 mt-8">
            <p className="font-game text-base text-primary mb-4">
              🎮 GAME COMPLETE 🎮
            </p>
            <p className="font-sans text-xl font-semibold text-foreground">
              Happy Birthday! 🎂✨
            </p>
            <p className="font-sans text-sm text-muted-foreground mt-4">
              Press Start to Continue Life's Adventure ▶️
            </p>
          </div>
        </>
      ),
      achievement: null, // Final card has special ending instead
    },
  ];

  return (
    <section
      id="message"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gamer-mint via-gamer-pink to-gamer-lavender py-20 px-4"
    >
      <div
        className={`w-full max-w-3xl mx-auto animate-fade-in transition-all duration-300 ${
          isExpanded ? "max-w-5xl" : ""
        }`}
      >
        <Carousel className="w-full">
          <CarouselContent>
            {letters.map((letter, index) => (
              <CarouselItem key={index}>
                <div className="bg-card/90 backdrop-blur-sm border-4 border-secondary rounded-3xl p-8 md:p-12 shadow-[var(--shadow-soft)] relative">
                  <Button
                    onClick={() => setIsExpanded(!isExpanded)}
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                  >
                    {isExpanded ? (
                      <Minimize2 size={20} />
                    ) : (
                      <Maximize2 size={20} />
                    )}
                  </Button>

                  <div className="flex justify-center mb-8">
                    <div className="relative">{letter.icon}</div>
                  </div>

                  <div
                    className={`space-y-6 text-center transition-all duration-300 ${
                      isExpanded ? "text-xl md:text-2xl" : ""
                    }`}
                  >
                    {letter.content}

                    {/* Achievement section - only if not the last card or if it has achievement */}
                    {letter.achievement && (
                      <div className="pt-6 border-t-2 border-primary/20 mt-8">
                        <p className="font-game text-xs text-muted-foreground mb-4">
                          ⭐ {letter.achievement.title} ⭐
                        </p>
                        <p className="font-sans text-base text-foreground">
                          {letter.achievement.name}
                        </p>
                        {letter.achievement.detail && (
                          <p className="font-sans text-sm text-muted-foreground mt-2">
                            {letter.achievement.detail}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="text-center mt-8">
                    <p className="font-game text-xs text-muted-foreground">
                      Letter {index + 1} of {letters.length}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 md:-left-12" />
          <CarouselNext className="right-0 md:-right-12" />
        </Carousel>
      </div>
    </section>
  );
};

export default MessageSection;
