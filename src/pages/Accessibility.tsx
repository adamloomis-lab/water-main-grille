import LegalLayout from '../components/LegalLayout'
import { company } from '../data/site'

export default function Accessibility() {
  return (
    <LegalLayout title="Accessibility Statement" updated="June 2026">
      <h2>Our commitment</h2>
      <p>
        This site is built to WCAG 2.1 Level AA, the standard referenced by the ADA for web
        accessibility. We review and update our accessibility practices on an ongoing basis.
      </p>

      <h2>What we have done</h2>
      <p>
        We have taken the following steps to make this site accessible to everyone:
      </p>
      <ul>
        <li>
          Skip links let keyboard and screen reader users bypass navigation and get straight to the
          main content without tabbing through every link on the page.
        </li>
        <li>
          A visible focus outline appears on every interactive element when it is navigated by
          keyboard, so users can always see where they are on the page.
        </li>
        <li>
          Text colors meet the 4.5:1 minimum contrast ratio for readability by people with low
          vision, following WCAG 2.1 AA requirements.
        </li>
        <li>
          All form fields, buttons, and interactive elements have descriptive labels so screen
          readers can accurately convey their purpose.
        </li>
        <li>
          Animations automatically reduce for users who have the Reduce Motion preference enabled
          on their device, to avoid discomfort for those sensitive to motion.
        </li>
      </ul>

      <h2>Report an issue</h2>
      <p>
        If you encounter any accessibility barrier on this site, please contact us and we will
        address it promptly. You can reach us by phone at{' '}
        <a href={company.phoneHref}>{company.phone}</a>.
      </p>
    </LegalLayout>
  )
}
