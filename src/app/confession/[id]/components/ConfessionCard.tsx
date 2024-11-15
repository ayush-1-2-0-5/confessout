import { Card } from "../../../../../components/ui/card";

interface ConfessionCardProps {
  confession: { id: number; confession: string };
}

export function ConfessionCard({ confession }: ConfessionCardProps) {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-800 mb-2 font-serif">Confession</h1>
        <div className="w-16 h-1 bg-pink-500 mx-auto"></div>
      </div>
      <div className="bg-yellow-100 p-4 rounded-lg shadow-inner mb-6 relative overflow-hidden h-64">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_9px,#94a3b8_10px)] bg-[size:100%_10px]" style={{ opacity: 0.2 }}></div>
        <div className="overflow-y-auto h-full pr-2">
          <p className="text-indigo-900 text-lg font-handwriting leading-[2.5rem] relative z-10">
            {confession.confession} {/* Access the 'confession' field */}
          </p>
        </div>
      </div>
    </Card>
  );
}
