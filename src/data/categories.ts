export type CategoryNode = {
  slug: string;
  title: string;
  description?: string;
  /** links = curated external links; media = audio/video/text uploads; library = general documents */
  kind?: "library" | "links" | "media" | "community";
  children?: CategoryNode[];
};

export const categories: CategoryNode[] = [
  {
    slug: "philosophy-culture",
    title: "瑜伽哲学与文化",
    description: "以人文哲学为径，探索瑜伽思想源流、史学脉络与美学表达。",
    children: [
      {
        slug: "yoga-philosophy",
        title: "瑜伽哲学",
        description: "古典与当代瑜伽哲学文本、注释与研究资料。",
      },
      {
        slug: "history-culture",
        title: "瑜伽史学与文化研究",
        description: "瑜伽在不同文明中的传播、演变与文化语境。",
      },
      {
        slug: "aesthetics",
        title: "瑜伽美学",
        description: "身体美学、仪式审美与瑜伽艺术表达。",
      },
      {
        slug: "philosophy-links",
        title: "瑜伽哲学文化相关网站链接",
        description: "精选哲学与文化研究权威站点。",
        kind: "links",
      },
    ],
  },
  {
    slug: "body-science",
    title: "身体健康与运动科学",
    description: "从解剖、生理到公共卫生，以科学方法守护身心平衡。",
    children: [
      {
        slug: "anatomy",
        title: "瑜伽解剖学",
        description: "体式、筋膜与运动解剖相关资料。",
      },
      {
        slug: "physiology",
        title: "瑜伽生理学",
        description: "呼吸、循环、神经与内分泌调节机制。",
      },
      {
        slug: "medicine",
        title: "瑜伽医学",
        description: "瑜伽作为辅助医学与康复路径的研究。",
      },
      {
        slug: "public-health",
        title: "瑜伽公共卫生学",
        description: "群体健康、预防医学与社区瑜伽实践。",
      },
      {
        slug: "mind-body",
        title: "瑜伽身心整合训练",
        description: "身心整合方法、训练方案与案例。",
      },
      {
        slug: "health-links",
        title: "健康相关网站链接",
        description: "权威健康与运动科学研究资源。",
        kind: "links",
      },
    ],
  },
  {
    slug: "psychology-consciousness",
    title: "心理学与意识科学",
    description: "意识、情绪与冥想科学的交叉研究。",
    children: [
      {
        slug: "yoga-psychology",
        title: "瑜伽心理学",
        description: "瑜伽传统中的心识模型与当代心理学对话。",
      },
      {
        slug: "neuroscience",
        title: "神经科学基础",
        description: "脑科学基础与瑜伽实践的神经机制。",
      },
      {
        slug: "meditation-mindfulness",
        title: "冥想与正念",
        description: "冥想方法、正念干预与实证文献。",
      },
      {
        slug: "sound-healing-psych",
        title: "声音疗愈",
        description: "声音、频率与心理疗愈相关研究。",
      },
      {
        slug: "consciousness",
        title: "意识研究",
        description: "意识本质、改变态与主观体验研究。",
      },
    ],
  },
  {
    slug: "music-sound",
    title: "瑜伽音乐与声音疗愈",
    description: "上传并管理文本、音频与视频等声音疗愈素材。",
    kind: "media",
  },
  {
    slug: "practical-techniques",
    title: "瑜伽实用技术汇总",
    description: "古典传承与现代技术体系的系统整理。",
    children: [
      {
        slug: "classical",
        title: "古典瑜伽技术",
        description: "八支瑜伽、哈他瑜伽等古典技术体系。",
        children: [
          {
            slug: "raja-ashtanga",
            title: "王瑜伽——八支瑜伽",
            description: "帕特嘉利八支瑜伽的经典技术与实践指引。",
          },
          {
            slug: "hatha",
            title: "哈他瑜伽",
            description: "体式、呼吸、泥印与清洁法相关资料。",
          },
        ],
      },
      {
        slug: "modern",
        title: "现代瑜伽研究技术",
        description: "现代课程、冥想与休息术技术汇总。",
        children: [
          {
            slug: "practice-courses",
            title: "练习课程",
            description: "结构化练习课程与教案资料。",
          },
          {
            slug: "meditation-tech",
            title: "冥想技术",
            description: "可操作的冥想技术清单与指导文本。",
          },
          {
            slug: "yoga-nidra",
            title: "休息术技术",
            description: "瑜伽休息术（Yoga Nidra）脚本与研究。",
          },
        ],
      },
    ],
  },
  {
    slug: "hot-topics",
    title: "瑜伽热门研究方向",
    description: "前沿交叉课题与学术热点。",
    children: [
      {
        slug: "yoga-neuroscience",
        title: "瑜伽与神经科学",
        description: "脑影像、神经可塑性与瑜伽干预研究。",
      },
      {
        slug: "psychotherapy",
        title: "瑜伽心理治疗",
        description: "瑜伽取向心理治疗理论与临床实践。",
      },
      {
        slug: "trauma-informed",
        title: "创伤疗愈瑜伽",
        description: "创伤知情瑜伽与身心安全实践。",
      },
      {
        slug: "consciousness-research",
        title: "意识研究",
        description: "意识科学前沿与瑜伽传统对话。",
      },
      {
        slug: "digital-humanities",
        title: "传统文本数字人文研究",
        description: "梵语文本数字化、语料分析与人文计算。",
      },
    ],
  },
  {
    slug: "wisdom-108",
    title: "瑜伽智慧108问",
    description: "上传音视频与文字材料，汇集常见智慧问答。",
    kind: "media",
  },
  {
    slug: "women-potential",
    title: "女性潜能瑜伽社群",
    description: "女性身心潜能、社群活动与实践分享空间。",
    kind: "community",
  },
  {
    slug: "education-practice",
    title: "瑜伽教育与社会实践",
    description: "全球教育资源与产业应用研究。",
    children: [
      {
        slug: "global-resources",
        title: "全球瑜伽教育资源",
        description: "院校、认证体系与开放课程资源。",
      },
      {
        slug: "industry",
        title: "现代应用与产业研究",
        description: "瑜伽产业、社会创新与应用场景研究。",
      },
    ],
  },
  {
    slug: "others",
    title: "其他",
    description:
      "按国际影响力综合排序的印度著名瑜伽大学、高校与研究机构链接，以及相关权威门户。",
    kind: "links",
  },
];

export function findCategoryPath(slugs: string[]): CategoryNode[] | null {
  let nodes: CategoryNode[] | undefined = categories;
  const path: CategoryNode[] = [];

  for (const slug of slugs) {
    const found: CategoryNode | undefined = nodes?.find(
      (n: CategoryNode) => n.slug === slug,
    );
    if (!found) return null;
    path.push(found);
    nodes = found.children;
  }

  return path;
}

export function getCategoryByPath(slugs: string[]): CategoryNode | null {
  const path = findCategoryPath(slugs);
  return path ? path[path.length - 1] : null;
}

export function categoryPathKey(slugs: string[]): string {
  return slugs.join("/");
}
