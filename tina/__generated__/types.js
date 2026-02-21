export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const HomepagePartsFragmentDoc = gql`
    fragment HomepageParts on Homepage {
  __typename
  hero {
    __typename
    badge
    badgeBg
    badgeText
    badgeSize
    badgeFont
    headline
    headlineColor
    headlineSize
    headlineFont
    accent
    accentColor
    subtext
    subtextColor
    subtextSize
    subtextFont
    primaryCtaText
    primaryCtaLink
    primaryBtnBg
    primaryBtnText
    primaryBtnSize
    secondaryCtaText
    secondaryCtaLink
    secondaryBtnBorder
    secondaryBtnText
    secondaryBtnSize
    backgroundImage
    overlayColor
    overlayOpacity
  }
  categories {
    __typename
    label
    labelColor
    labelSize
    labelFont
    title
    titleColor
    titleSize
    titleFont
    subtitle
    subtitleColor
    subtitleSize
    subtitleFont
    items {
      __typename
      title
      subtitle
      href
      bg
      image
    }
    sectionBg
    cardBg
    cardTitleColor
    cardSubColor
  }
  trust {
    __typename
    label
    labelColor
    labelSize
    labelFont
    title
    titleColor
    titleSize
    titleFont
    items {
      __typename
      icon
      title
      desc
    }
    sectionBg
    cardBg
    cardTitleColor
    cardDescColor
    iconColor
    iconBg
  }
  studio {
    __typename
    label
    labelColor
    labelSize
    labelFont
    title
    titleColor
    titleSize
    titleFont
    text
    textColor
    textSize
    textFont
    features
    featureIconColor
    featureTextColor
    ctaText
    ctaLink
    ctaBg
    ctaTextColor
    images
    sectionBg
  }
  cta {
    __typename
    label
    labelColor
    labelSize
    labelFont
    title
    titleColor
    titleSize
    titleFont
    subtitle
    subtitleColor
    subtitleSize
    subtitleFont
    primaryText
    primaryLink
    primaryBtnBg
    primaryBtnText
    secondaryText
    secondaryLink
    secondaryBtnBorder
    secondaryBtnText
    sectionBg
  }
  reviews {
    __typename
    label
    labelColor
    labelSize
    labelFont
    title
    titleColor
    titleSize
    titleFont
    sectionBg
  }
}
    `;
export const ProjectPartsFragmentDoc = gql`
    fragment ProjectParts on Project {
  __typename
  title
  titleColor
  titleSize
  titleFont
  description
  descColor
  descSize
  descFont
  cardBg
  category
  completionDate
  images
}
    `;
export const ReviewPartsFragmentDoc = gql`
    fragment ReviewParts on Review {
  __typename
  quote
  quoteColor
  quoteSize
  quoteFont
  name
  nameColor
  nameSize
  location
  locationColor
  locationSize
  rating
  starColor
  cardBg
}
    `;
export const SettingsPartsFragmentDoc = gql`
    fragment SettingsParts on Settings {
  __typename
  brandName
  customFont
  goldColor
  phone
  email
  location
  whatsapp
  instagram
  facebook
  tiktok
  twitter
  pinterest
  footerBg
  footerTitleColor
  footerTitleSize
  footerTitleFont
  footerTextColor
  footerTextSize
  footerTextFont
  footerLinkColor
  footerLinkSize
  footerLinkFont
  footerSocialColor
  categories
  portfolio {
    __typename
    label
    labelColor
    labelSize
    labelFont
    title
    titleColor
    titleSize
    titleFont
    subtitle
    subtitleColor
    subtitleSize
    subtitleFont
    sectionBg
  }
  header {
    __typename
    logoImage
    logoText
    logoColor
    logoEnSize
    logoFont
    logoAr
    logoArColor
    logoArSize
    navLinks {
      __typename
      label
      href
    }
    navLinkColor
    navLinkSize
    navLinkFont
    ctaLabel
    ctaBg
    ctaTextColor
    ctaFontSize
    ctaFont
    headerBg
  }
}
    `;
export const HomepageDocument = gql`
    query homepage($relativePath: String!) {
  homepage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...HomepageParts
  }
}
    ${HomepagePartsFragmentDoc}`;
export const HomepageConnectionDocument = gql`
    query homepageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HomepageFilter) {
  homepageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...HomepageParts
      }
    }
  }
}
    ${HomepagePartsFragmentDoc}`;
export const ProjectDocument = gql`
    query project($relativePath: String!) {
  project(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ProjectParts
  }
}
    ${ProjectPartsFragmentDoc}`;
export const ProjectConnectionDocument = gql`
    query projectConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ProjectFilter) {
  projectConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ProjectParts
      }
    }
  }
}
    ${ProjectPartsFragmentDoc}`;
export const ReviewDocument = gql`
    query review($relativePath: String!) {
  review(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ReviewParts
  }
}
    ${ReviewPartsFragmentDoc}`;
export const ReviewConnectionDocument = gql`
    query reviewConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ReviewFilter) {
  reviewConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ReviewParts
      }
    }
  }
}
    ${ReviewPartsFragmentDoc}`;
export const SettingsDocument = gql`
    query settings($relativePath: String!) {
  settings(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...SettingsParts
  }
}
    ${SettingsPartsFragmentDoc}`;
export const SettingsConnectionDocument = gql`
    query settingsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SettingsFilter) {
  settingsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...SettingsParts
      }
    }
  }
}
    ${SettingsPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    homepage(variables, options) {
      return requester(HomepageDocument, variables, options);
    },
    homepageConnection(variables, options) {
      return requester(HomepageConnectionDocument, variables, options);
    },
    project(variables, options) {
      return requester(ProjectDocument, variables, options);
    },
    projectConnection(variables, options) {
      return requester(ProjectConnectionDocument, variables, options);
    },
    review(variables, options) {
      return requester(ReviewDocument, variables, options);
    },
    reviewConnection(variables, options) {
      return requester(ReviewConnectionDocument, variables, options);
    },
    settings(variables, options) {
      return requester(SettingsDocument, variables, options);
    },
    settingsConnection(variables, options) {
      return requester(SettingsConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
