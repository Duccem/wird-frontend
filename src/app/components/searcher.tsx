import { Input } from "@/libs/shadcn/components/ui/input";
import { Search, X } from "lucide-react";

type SearcherProps = {
  term: string;
  setTerm: (term: string) => void;
}

const Searcher = ({ term, setTerm }: SearcherProps) => {
  return (
    <div className="relative w-1/2">
      <Input className="outline-none text-secondary-foreground box-border focus-visible:ring-transparent" value={term} onChange={(event) => setTerm(event.target.value)} />
      {!term ? <Search className="absolute h-4 w-4  right-2 top-2.5" /> : <button
        className="rounded-sm hover:bg-gray-200 absolute right-2 top-2.5"
        onClick={() => {
          setTerm('');
        }}
      >
        <X className="size-4" />
      </button>}

    </div>
  );
}

export default Searcher;
