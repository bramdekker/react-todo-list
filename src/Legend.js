import './Legend.css';

function Legend() {
    function makeLegendBox(boxColor) {
        return (
            <div className={`legendBox ${boxColor}`}></div>
        );
    }

    function makeBoxes() {
        const elements = [];

        const cats = {
            "School": "red",
            "Work": "blue",
            "Housekeeping": "yellow",
            "Other": "green",
        };

        for (let prop in cats) {
            elements.push(
                <span key={prop}>
                    {makeLegendBox(cats[prop])}
                    <span>{prop}</span>
                </span>
            );
        }

        return elements;
    }

    return (
        <span className="legendWrapper">
            {makeBoxes()}
        </span>
    );
}

export default Legend;
