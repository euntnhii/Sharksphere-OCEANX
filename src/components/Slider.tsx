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

            <h3>
                Shark Population: {Math.ceil(sharkPopulation)}
            </h3>

            <div className="slider-container">

                <input
                    className="population-slider"
                    type="range"
                    min="0"
                    max="14"
                    value={sharkPopulation}
                    onChange={handleChange}
                />

            </div>

            <div className="slider-labels">
                <span>0 Sharks</span>
                <span>14 Sharks</span>
            </div>

        </div>
    );
}