export type WeekItem = {
  week: number;
  slug: string;
  title: string;
  status: "available" | "coming-soon";
};

export type CurriculumConfig = {
  phase: number;
  label: string;
  slug: string;
  color: string;
  icon: string;
  weeks: WeekItem[];
};

export const CURRICULUM: CurriculumConfig[] = [
  {
    phase: 0,
    label: "Orientation",
    slug: "phase-0-orientation",
    color: "violet",
    icon: "Compass",
    weeks: [
      { week: 0, slug: "week-0-introduction", title: "Intro to Data Engineering & Setup", status: "available" }
    ]
  },
  {
    phase: 1,
    label: "Data Engineering Foundations",
    slug: "phase-1-foundations",
    color: "blue",
    icon: "Code2",
    weeks: [
      { week: 1, slug: "week-1-python-git-jira",   title: "Python + Git + Jira",    status: "available" },
      { week: 2, slug: "week-2-python-pandas",      title: "Python + Pandas",        status: "available" },
      { week: 3, slug: "week-3-sql-fundamentals",   title: "SQL Fundamentals",       status: "available" },
      { week: 4, slug: "week-4-databricks-delta",   title: "Databricks + Delta Lake",status: "available" },
      { week: 5, slug: "week-5-pyspark",            title: "PySpark",                status: "available" }
    ]
  },
  {
    phase: 2,
    label: "Advanced Engineering",
    slug: "phase-2-advanced-engineering",
    color: "emerald",
    icon: "Layers",
    weeks: [
      { week: 6, slug: "week-6-cloud-fundamentals", title: "Cloud Fundamentals",     status: "available" },
      { week: 7, slug: "week-7-data-modelling",     title: "Data Modelling & Warehousing", status: "available" },
      { week: 8, slug: "week-8-etl-cicd",           title: "ETL/ELT + CI/CD",        status: "available" }
    ]
  },
  {
    phase: 3,
    label: "Data Analytics",
    slug: "phase-3-analytics",
    color: "amber",
    icon: "BarChart2",
    weeks: [
      { week: 9,  slug: "week-9-excel-kpis",        title: "Excel + KPIs",           status: "available" },
      { week: 10, slug: "week-10-powerbi-dax",       title: "Power BI + DAX",         status: "available" },
      { week: 11, slug: "week-11-advanced-powerbi",  title: "Advanced Power BI",      status: "available" }
    ]
  },
  {
    phase: 4,
    label: "Capstone & Beyond",
    slug: "phase-4-capstone",
    color: "rose",
    icon: "Rocket",
    weeks: [
      { week: 12, slug: "week-12-capstone",          title: "Capstone Project",       status: "available" },
      { week: 13, slug: "week-13-15-ai-productivity",title: "AI & Productivity (Bonus)", status: "available" }
    ]
  }
];

export const SITE_CONFIG = {
  name: "Data Engineering with Rahul",
  shortName: "DE with Rahul",
  description: "A 15-week hands-on curriculum covering Data Engineering & Analytics — from Python basics to Databricks, PySpark, Power BI, and AI.",
  url: "https://dataengineeringwithrahul.com",
  totalWeeks: 14,
  author: "Rahul"
};
