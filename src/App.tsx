import { useState, useCallback } from "react";
import { FranceMap } from "./components/FranceMap/FranceMap";
import {
  departmentCodeToVaccinationCoverageMap,
  mapDepartmentCodes,
  departmentCodeToNameMap,
} from "./constants.ts";

const departmentCodesWithData = new Set(
  Object.keys(departmentCodeToVaccinationCoverageMap)
);

const datalessDepartmentCodes = new Set(mapDepartmentCodes).difference(
  departmentCodesWithData
);

function App() {
  const [selectedDepartment, setSelectedDepartment] = useState("29");
  const [coverageTarget, setCoverageTarget] = useState(75);
  const [dataKey, setDataKey] = useState("2024");

  const highlightedDeps = new Set(
    Object.entries(departmentCodeToVaccinationCoverageMap).flatMap(
      ([departmentKey, yearCoverageMap]) =>
        yearCoverageMap[dataKey as keyof typeof yearCoverageMap] + 0.1 <
        coverageTarget
          ? departmentKey
          : []
    )
  );

  const departmentData =
    departmentCodeToVaccinationCoverageMap[
      selectedDepartment as keyof typeof departmentCodeToVaccinationCoverageMap
    ] ?? {};

  const handleDepartmentClicked = useCallback((e: MouseEvent) => {
    const target = e.target;
    if (!(target instanceof SVGPathElement)) return;
    const departmentNumber = target.dataset.numerodepartement ?? "01";
    if (datalessDepartmentCodes.has(departmentNumber)) {
      return;
    }
    setSelectedDepartment(departmentNumber);
  }, []);

  return (
    <>
      <header>
        <h1>Vaxx Map (grippe)</h1>
      </header>
      <div className="main-layout">
        <div className="map-container">
          <FranceMap
            onDepartmentClick={handleDepartmentClicked}
            highlightedDepartments={highlightedDeps}
            greyedOutDepartments={datalessDepartmentCodes}
          />
        </div>
        <aside>
          <h2>Choix Année: </h2>
          <label htmlFor="year-select">Sélectionnez une année: </label>
          <select
            name="year-select"
            id="year-select"
            onChange={(e) => setDataKey(e.target.value)}
            value={dataKey}
          >
            {Object.keys(departmentData).map((year) => (
              <option value={year} key={year}>
                {year === "nextYearLinearExtrapolation"
                  ? "Prédiction 2025"
                  : year}
              </option>
            ))}
          </select>
          <h2>{`Département: ${selectedDepartment} (${
            departmentCodeToNameMap[
              selectedDepartment as keyof typeof departmentCodeToNameMap
            ]
          })`}</h2>

          <div>
            <h2>Taux de vaccination cible: </h2>
            <input
              id="coverage-target"
              type="range"
              min={0}
              max={100}
              step={1}
              value={coverageTarget}
              onChange={(e) => setCoverageTarget(Number(e.target.value))}
            />
            <output htmlFor="coverage-target"> {coverageTarget}%</output>
            <p> Taux de vaccination cible selon l'OMS: 75%</p>
          </div>
          {Object.entries(departmentData).map(([yearKey, coverage]) => (
            <div className="meter-container" key={yearKey}>
              <p>
                <label htmlFor={`coverage-${yearKey}`}>
                  {yearKey === "nextYearLinearExtrapolation"
                    ? "Prédiction 2025"
                    : yearKey}
                </label>
              </p>

              <span>
                <meter
                  id={`coverage-${yearKey}`}
                  min="0"
                  max="100"
                  high={coverageTarget - 0.1}
                  optimum={coverageTarget}
                  value={Math.round(coverage)}
                ></meter>
                {` ${Math.round(coverage)}%`}
              </span>
            </div>
          ))}
        </aside>
      </div>
    </>
  );
}

export default App;
