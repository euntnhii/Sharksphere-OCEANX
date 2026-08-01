import type { AnomalyResult } from "../types/ecosystemState";

//create props type
type AnomalyIndicatorProps = {
    anomalyResult: AnomalyResult;
};

//create component function
export function AnomalyIndicator(props: AnomalyIndicatorProps) {

    return (
        <div className="anomaly-row">
            {/* display anomaly percentage */}
            <h3>Anomaly Percentage </h3>
            <p>{props.anomalyResult.anomaly_percentage.toFixed(2)}%</p>
        </div>
    );

};