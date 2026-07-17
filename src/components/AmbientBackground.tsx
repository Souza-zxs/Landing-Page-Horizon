import { Shader, ChromaFlow, FilmGrain, FlutedGlass, Swirl } from "shaders/react";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Shader className="w-full h-full">
        <Swirl colorA="#0A1F44" colorB="#0F2D5E" detail={1.7} />
        <ChromaFlow
          baseColor="#0A1F44"
          downColor="#FF6A00"
          leftColor="#FF9640"
          rightColor="#FF6A00"
          upColor="#FF9640"
          momentum={13}
          radius={3.5}
        />
        <FlutedGlass
          aberration={0.61}
          angle={31}
          frequency={8}
          highlight={0.12}
          highlightSoftness={0}
          lightAngle={-90}
          refraction={4}
          shape="rounded"
          softness={1}
          speed={0.15}
        />
        <FilmGrain strength={0.05} />
      </Shader>
    </div>
  );
}
