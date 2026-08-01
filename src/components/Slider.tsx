import "./Slider.css";

//props type
type SliderProps = {
    sharkPopulation: number;
    onSliderChange: (population: number) => void;
};

export function Slider({
    sharkPopulation,
    onSliderChange
}: SliderProps) {

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        onSliderChange(Number(event.target.value));
    }

    return (
        <div className="slider-panel">

            <div className="slider-row">

                <span className="slider-min">0 Sharks</span>

                <input
                    className="population-slider"
                    type="range"
                    min="0"
                    max="14"
                    value={sharkPopulation}
                    onChange={handleChange}
                />

                <span className="slider-max">14 Sharks</span>

            </div>

        </div>
    );
}