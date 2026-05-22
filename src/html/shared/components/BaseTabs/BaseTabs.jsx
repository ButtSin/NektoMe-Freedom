import styles from "./BaseTabs.module.scss";
import ButtonTabs from "@/html/shared/components/ButtonTabs/ButtonTabs.jsx";

const BaseTabs = ({ heading, headingId, selected, tabs }) => {
  return (
    <section>
      <h2 className="visually-hidden" id={headingId}>
        {heading}
      </h2>
      <header className={`${styles.tabs__header}`}>
        <div
          className={`${styles.tabs__buttons}`}
          role="tablist"
          aria-orientation="horizontal"
          aria-labelledby={headingId}
        >
          {tabs.map((tab) => (
            <ButtonTabs
              icon={tab.icon}
              description={tab.description}
              panel={tab.panel}
              id={tab.id}
              selected={selected === tab.id}
              key={tab.id}
            />
          ))}
        </div>
      </header>
    </section>
  );
};

export default BaseTabs;
