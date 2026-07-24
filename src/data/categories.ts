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
    slug: "classical-wisdom",
    title: "瑜伽古典智慧",
    description:
      "从梵文原典、公共版权译本与历代注疏进入瑜伽的哲学源流，建立可核验的经典阅读路径。",
    children: [
      {
        slug: "core-texts",
        title: "核心经典导读",
        description: "《瑜伽经》《奥义书》《薄伽梵歌》等原典、术语对照与导读。",
      },
      {
        slug: "yoga-sutra",
        title: "《瑜伽经》Yoga Sūtra",
        description: "梵文原文、早期英译、传统注疏与现代学术研究索引。",
        kind: "links",
      },
      {
        slug: "upanishads",
        title: "《奥义书》Upaniṣads",
        description: "主要奥义书与瑜伽奥义书的梵文、公共版权译本及研究资源。",
        kind: "links",
      },
      {
        slug: "bhagavad-gita",
        title: "《薄伽梵歌》Bhagavad Gītā",
        description: "梵英对照公共版权版本、章节主题索引与传统注释。",
        kind: "links",
      },
      {
        slug: "hatha-classics",
        title: "哈他瑜伽经典",
        description: "《哈他瑜伽之光》《格兰达本集》等早期版本与文本研究。",
        kind: "links",
      },
      {
        slug: "sanskrit-text-libraries",
        title: "梵文文本与数字典藏",
        description: "可靠的电子文本、手稿、词典与公共版权影印本入口。",
        kind: "links",
      },
    ],
  },
  {
    slug: "modern-science",
    title: "瑜伽 × 现代科学",
    description:
      "连接现代瑜伽思想与解剖学、心理学、意识科学、医学、历史和运动健康研究，明确证据边界。",
    children: [
      {
        slug: "research-guides",
        title: "跨学科研究导读",
        description: "医学、神经科学、正念与研究方法的原创导读和检索指南。",
      },
      {
        slug: "modern-teachers",
        title: "现当代瑜伽思想",
        description: "大师生平、思想脉络、正版出版与获授权开放资料，不收录侵权全文。",
        kind: "links",
      },
      {
        slug: "anatomy-physiology",
        title: "解剖学与生理学",
        description: "体式、筋膜、呼吸、神经和运动生理研究。",
        kind: "links",
      },
      {
        slug: "psychology-consciousness",
        title: "心理学与意识科学",
        description: "认知、情绪、自主神经、脑科学与意识研究。",
        kind: "links",
      },
      {
        slug: "history-culture",
        title: "现代瑜伽史与文化",
        description: "近现代体式文化、全球传播、殖民史与跨文化研究。",
        kind: "links",
      },
      {
        slug: "medicine-evidence",
        title: "瑜伽医学与循证研究",
        description: "临床试验、系统综述、公共卫生指南与研究数据库。",
        kind: "links",
      },
      {
        slug: "mindfulness-meditation",
        title: "正念、冥想与瑜伽",
        description: "冥想干预、压力调节与身心医学的交叉成果。",
        kind: "links",
      },
      {
        slug: "movement-health",
        title: "运动、康复与健康",
        description: "运动控制、疼痛管理、老龄健康与安全练习研究。",
        kind: "links",
      },
    ],
  },
  {
    slug: "techniques",
    title: "瑜伽技术探索",
    description:
      "系统整理体式、呼吸、清洁术、收束法、手印、冥想与休息术；强调循序渐进、禁忌证与专业指导。",
    children: [
      {
        slug: "practice-guides",
        title: "综合练习导引",
        description: "八支瑜伽与安全练习的结构化原创纲要。",
      },
      {
        slug: "asana",
        title: "体式 Āsana",
        description: "基础体式、顺位原则、辅助工具、变体和常见禁忌。",
        kind: "links",
      },
      {
        slug: "pranayama",
        title: "呼吸法 Prāṇāyāma",
        description: "呼吸觉察、调息技术、节律与安全边界。",
        kind: "links",
      },
      {
        slug: "shatkarma-bandha-mudra",
        title: "清洁术 · 收束法 · 手印",
        description: "Ṣaṭkarma、Bandha、Mudrā 的传统来源、操作风险与学习路径。",
        kind: "links",
      },
      {
        slug: "meditation",
        title: "冥想术 Dhyāna",
        description: "专注、开放监测、曼陀罗与传统禅定技术。",
        kind: "links",
      },
      {
        slug: "yoga-nidra",
        title: "瑜伽休息术 Yoga Nidrā",
        description: "深度放松、身体扫描、引导脚本与相关研究。",
        kind: "links",
      },
      {
        slug: "sound-mantra",
        title: "声音、唱诵与曼陀罗",
        description: "Nāda、Mantra、诵唱与声音练习的文献和实践入口。",
        kind: "media",
      },
    ],
  },
  {
    slug: "research-institutions",
    title: "瑜伽研究机构",
    description:
      "汇集大学、政府机构、研究中心、专业协会与学术期刊；原“其他”目录中的权威链接已迁入并继续扩充。",
    children: [
      {
        slug: "india",
        title: "印度研究与教育机构",
        description: "国家级研究所、大学、传统学院与历史研究中心。",
        kind: "links",
      },
      {
        slug: "global",
        title: "全球科研与专业组织",
        description: "国际医学研究机构、瑜伽治疗协会与高校研究项目。",
        kind: "links",
      },
      {
        slug: "journals-databases",
        title: "期刊与研究数据库",
        description: "同行评审期刊、文献数据库、系统综述与临床试验入口。",
        kind: "links",
      },
      {
        slug: "institution-directory",
        title: "机构综合目录（原“其他”）",
        description: "保留原目录全部机构，并按学术与公共影响力整理。",
        kind: "links",
      },
    ],
  },
  {
    slug: "retreats-world",
    title: "世界瑜伽村与静修中心",
    description:
      "按地区汇集公开官网与简介，帮助比较传统、课程和所在地；行程、资质、安全与费用请向机构独立核验。",
    children: [
      {
        slug: "india-asia",
        title: "印度与亚洲",
        description: "印度、尼泊尔、斯里兰卡、东南亚与东亚静修目的地。",
        kind: "links",
      },
      {
        slug: "europe",
        title: "欧洲",
        description: "欧洲传统修习中心、生态社区与山地静修场所。",
        kind: "links",
      },
      {
        slug: "americas",
        title: "美洲与加勒比",
        description: "北美、拉丁美洲与加勒比地区的非营利及传统静修中心。",
        kind: "links",
      },
      {
        slug: "oceania-africa",
        title: "大洋洲与非洲",
        description: "澳大利亚、新西兰与非洲地区的瑜伽静修资源。",
        kind: "links",
      },
      {
        slug: "global-networks",
        title: "全球静修网络与查找指南",
        description: "跨国中心目录，以及选择静修项目时的核验清单。",
        kind: "links",
      },
      {
        slug: "selection-guide",
        title: "静修选择与安全指南",
        description: "比较师资、日程、费用、健康支持、伦理规范和退出机制的实用清单。",
      },
    ],
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
