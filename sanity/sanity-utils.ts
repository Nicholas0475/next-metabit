import BlogPost from "@/types/Blog-Posts";
import { Employee } from "@/types/Employee";
import { createClient, groq } from "next-sanity";

export async function getHomeData() {
  const client = createClient({
    projectId: "eitw7pjp",
    dataset: "production",
  });

  return client.fetch(
    groq`*[_type == "home"]{
        _id,

        homePageHead,

        whoWeAre,

        mission,

        whatWeDo,
    }`
  );
}

export async function getEmployeeList(slug: string): Promise<Employee> {
  const client = createClient({
    projectId: 'eitw7pjp',
    dataset: 'production',
  });

  console.log("Fetching employee data for slug:", slug);

  return client.fetch(
    groq`*[_type == "employeeList" && slug.current == $slug][0]
      | order(_createdAt asc)  // Change 'desc' to 'asc' for ascending order
      {
        _id,
        employeeBgImage,
        employeeImage,
        name,
        "slug": slug.current,
        position1,
        position2,
        description,
        phoneNumber,
        email,
        workAddress,
        socialMediaLinks
      }`,
      { slug }
  );
}

export async function getEmployeeData(): Promise<Employee[]> {
  const client = createClient({
    projectId: "eitw7pjp",
    dataset: "production",
  });

  return client.fetch(
    groq`*[_type == "employeeList"]
      | order(_createdAt asc)  // Change 'desc' to 'asc' for ascending order
      {
        _id,
        employeeBgImage,
        employeeImage,
        name,
        "slug": slug.current,
        position1,
        position2,
        description,
        phoneNumber,
        email,
        workAddress,
        socialMediaLinks
      }`
  );
}

export async function getEmployeeDatas(slug: string) {
  const client = createClient({
    projectId: "eitw7pjp",
    dataset: "production",
  });

  return client.fetch(
    groq`*[_type == "employeeList"]
      | order(_createdAt asc)  // Change 'desc' to 'asc' for ascending order
      {
        _id,
        employeeBgImage,
        employeeImage,
        name,
        "slug": slug.current,
        position1,
        position2,
        description,
        phoneNumber,
        email,
        workAddress,
        socialMediaLinks
      }`,
      { slug }
  );
}

export async function getPhasesData() {
  const client = createClient({
    projectId: "eitw7pjp",
    dataset: "production",
  });

  return client.fetch(
    groq`*[_type == "phases"] | order(_createdAt asc){
      _id,
      phaseName,
      phaseHeader,
      phaseSubHeader,
      phaseTextArea
    }`
  );
}


export async function getMajorAchievementData() {
  const client = createClient({
    projectId: "eitw7pjp",
    dataset: "production",
  });

  return client.fetch(
    groq`*[_type == "majorAchievement"]{
      _id,
      majorAchievementTitle,
      majorAchievementImages
    }`
  );
}

export async function getProjectsData() {
  const client = createClient({
    projectId: 'eitw7pjp',
    dataset: 'production',
  });

  return client.fetch(
    groq`*[_type == "projectPage"]{
      _id,
      title,
      projects[]{
        projectName,
        projectDescription,
        projectImg,
        projectUrl
      },
      seeMore
    }`
  );
}

export async function getServicesData() {
  const client = createClient({
    projectId: 'eitw7pjp',
    dataset: 'production',
  });

  return client.fetch(
    groq`*[_type == "services"]{
      _id,
      servicesHeader,
      services,
      solutionSection{
        sectionTitle,
        sectionDescription,
        solutions[]{
          solutionIcon,
          solutionTitle,
          solutionDescription
        }
      }
    }`
  );
}

export async function getContactPageData() {
  const client = createClient({
    projectId: 'eitw7pjp',
    dataset: 'production',
  });

  return client.fetch(
    groq`*[_type == "contact"] {
      _id,
      joinUsPage,
      businessOpportunitySection,
      joinUsSection{
        title,
        text,
        bgImage,
        positions[]{
          positionTitle,
          positionDescription
        }
      },
      connectSection
    }`
  );
}


export async function getSolutionsPageData() {
  const client = createClient({
    projectId: 'eitw7pjp',
    dataset: 'production',
  });

  return client.fetch(
    groq`*[_type == "solutions"] {
      name,
      type,
      title,
      solutionsPageHeader,
      aboutCrypto,
      nftDataStructure
    }`
  );
}

export async function getAboutData() {
  const client = createClient({
    projectId: "eitw7pjp",
    dataset: "production",
  });

  return client.fetch(
    groq`*[_type == "about"]{
      _id,
      ourMissionTitle,
      ourMissionContent,
      expertise,
      ourTeamSectionTitle,
      companyProfile
    }`
  );
}


export async function getBlogPostCategoryData() {
  const client = createClient({
    projectId: "eitw7pjp",
    dataset: "production",
  });

  return client.fetch(
    groq`*[_type == "postCategory"]{
      _id,
      category,
    }`
  );
}

export async function getBlogPostsData() {
  const client = createClient({
    projectId: "eitw7pjp",
    dataset: "production",
  });

  return client.fetch(
    groq`*[_type == "blogPosts"]{
      _id,
      title,
      category->,
      "slug": slug.current,
      image,
      content,
      _createdAt
    }`
  );
}

export async function getBlogPostsDetail(slug: string): Promise<BlogPost> {
  const client = createClient({
    projectId: 'eitw7pjp',
    dataset: 'production',
  });

  console.log("Fetching employee data for slug:", slug);

  return client.fetch(
    groq`*[_type == "blogPosts"&& slug.current == $slug][0]{
      _id,
      title,
      category->,
      "slug": slug.current,
      image,
      content,
      _createdAt
    }`,
    { slug }
  );
}

export async function fetchBlogPosts() {
  const client = createClient({
    projectId: 'eitw7pjp',
    dataset: 'production',
  });

  return client.fetch(
    groq`*[_type == "blogPosts"]{
      "slug": slug.current,
      title
    }`
  );
}



