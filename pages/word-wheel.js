import Seo from "../components/Seo";
import WordWheel from "../components/WordWheel";

const WordWheelPage = () => (
  <>
    <Seo
      title="Word Wheel | Tom Butterwith - butterwith.space"
      description="Play Word Wheel, a daily word puzzle from Tom Butterwith."
      canonicalPath="/word-wheel"
    />
    <WordWheel />
  </>
);

export default WordWheelPage;
