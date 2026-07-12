import type { AnomalyResult } from "../types/ecosystemState";

//create props type
type AnomalyIndicatorProps = {
    anomalyResult: AnomalyResult;
};

//create component function
export function AnomalyIndicator(props: AnomalyIndicatorProps) {

    return (
        <>
            {/* display anomaly percentage */}
            <p>
                Anomaly Percentage: {props.anomalyResult.anomalyPercentage.toFixed(2)}%
            </p>

        </>
    );

};