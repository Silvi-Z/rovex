import { Fragment } from 'react';
import { PROCESS_STEPS } from '../../data/processSteps';
import './Process.css';

export default function Process() {
  return (
    <section className="process">
      <div className="process__glow" role="presentation" />
      <div className="container">
        <h2 className="process__heading">{'ինչպես ենք  Աշխատում'}</h2>

        <div className="process__rail" role="presentation" />

        <ol className="process__grid">
          {PROCESS_STEPS.map((step, index) => {
            const isSingleLine = step.title.length === 1;

            return (
              <li className="step" key={step.id}>
                <span className="step__num" aria-hidden="true">{index + 1}</span>
                <h3 className={isSingleLine ? 'step__title step__title--single' : 'step__title'}>
                  {step.title.map((line, lineIndex) => (
                    <Fragment key={line}>
                      {lineIndex > 0 && <br />}
                      {line}
                    </Fragment>
                  ))}
                </h3>
                <p className="step__body">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
