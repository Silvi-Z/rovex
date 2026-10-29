import Accordion from '../../components/Accordion/Accordion';
import { ADVANTAGES } from '../../data/advantages';
import './WhyRovex.css';

export default function WhyRovex() {
  return (
    <section className="why">
      <div className="container why__grid">
        <div className="why__left">
          <h2 className="why__heading">
            {'Ֆասադը շենքի այցեքարտն է և նրա հուսալի պաշտպանը տարիներ  շարունակ'}
          </h2>
          <p className="why__body">
            {' «ROVEX»-ը ստանձնում է աշխատանքների ամբողջ ցիկլը՝  ինժեներական նախագծում, ապակու և ալյումինե կոնստրուկցիաների  սեփական արտադրություն, ֆասադային ենթահամակարգերի մոնտաժ,  երեսպատում, ապակեպատում, երաշխիքային և հետերաշխիքային  սպասարկում։'}
          </p>
        </div>

        <div className="why__right">
          <h2 className="why__title">ԻՆՉՈՒ ԵՆ ԸՆՏՐՈՒՄ «ROVEX»-ը</h2>
          <Accordion items={ADVANTAGES} defaultOpenId={ADVANTAGES[0].id} />
        </div>
      </div>
    </section>
  );
}
