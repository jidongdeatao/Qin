export type ResourceLink = {
  title: string;
  url: string;
  description: string;
  tags?: string[];
  /** Optional rank badge, used by curated ranked lists. */
  rank?: number;
};

/** Curated authoritative yoga / mind-body / culture resources. */
export const resourceLinksByCategory: Record<string, ResourceLink[]> = {
  "philosophy-culture/philosophy-links": [
    {
      title: "Yoga Sutra Online (Sacred Texts)",
      url: "https://www.sacred-texts.com/hin/yogasutr.htm",
      description: "古典《瑜伽经》英译与公开文本资源。",
      tags: ["经典", "哲学"],
    },
    {
      title: "Internet Encyclopedia of Philosophy — Yoga",
      url: "https://iep.utm.edu/yoga/",
      description: "哲学百科中的瑜伽条目，适合入门与检索。",
      tags: ["哲学", "百科"],
    },
    {
      title: "Stanford Encyclopedia of Philosophy",
      url: "https://plato.stanford.edu/",
      description: "斯坦福哲学百科，可检索印度哲学相关条目。",
      tags: ["哲学", "学术"],
    },
    {
      title: "GRETIL — Göttingen Register of Electronic Texts",
      url: "http://gretil.sub.uni-goettingen.de/",
      description: "梵语电子文本库，服务传统文本数字人文研究。",
      tags: ["梵语", "数字人文"],
    },
  ],
  "body-science/health-links": [
    {
      title: "PubMed",
      url: "https://pubmed.ncbi.nlm.nih.gov/",
      description: "生物医学文献数据库，检索瑜伽健康相关研究。",
      tags: ["医学", "文献"],
    },
    {
      title: "NIH National Center for Complementary and Integrative Health",
      url: "https://www.nccih.nih.gov/health/yoga-what-you-need-to-know",
      description: "美国 NIH 关于瑜伽的健康信息概览。",
      tags: ["公共卫生", "权威"],
    },
    {
      title: "Cochrane Library",
      url: "https://www.cochranelibrary.com/",
      description: "系统综述数据库，评估瑜伽干预证据质量。",
      tags: ["循证", "综述"],
    },
    {
      title: "WHO Traditional Medicine",
      url: "https://www.who.int/health-topics/traditional-complementary-and-integrative-medicine",
      description: "世界卫生组织传统与补充医学主题页。",
      tags: ["公共卫生", "WHO"],
    },
  ],
  /**
   * 印度著名瑜伽大学 / 高校 / 研究机构
   * 排序依据：国际学术可见度、研究产出与合作、国家级定位、历史传承与全球教学影响（综合研判，非单一排行榜）。
   */
  others: [
    {
      rank: 1,
      title: "S-VYASA University（斯瓦米维韦卡南达瑜伽大学）",
      url: "https://www.svyasa.edu.in/",
      description:
        "班加罗尔瑜伽专业 deemed-to-be university，NAAC 高评级；研究、学位教育与国际会议活跃，是全球瑜伽科研合作中高频出现的印度高校。",
      tags: ["大学", "研究", "班加罗尔"],
    },
    {
      rank: 2,
      title: "Morarji Desai National Institute of Yoga（MDNIY）",
      url: "https://www.yogamdniy.nic.in/",
      description:
        "印度 AYUSH 部国家级瑜伽研究所，承担标准制定、教育培训与公众推广，国际政策与认证对话中代表性强。",
      tags: ["国家级", "AYUSH", "新德里"],
    },
    {
      rank: 3,
      title: "Kaivalyadhama Yoga Institute（凯瓦利亚达玛）",
      url: "https://kdham.com/",
      description:
        "1924 年创立的世界最早科学瑜伽研究机构之一，出版 Yoga Mimamsa，兼具科研、教育与疗愈，海外分支广泛。",
      tags: ["研究机构", "历史", "Lonavala"],
    },
    {
      rank: 4,
      title: "Bihar School of Yoga / Bihar Yoga Bharati",
      url: "https://biharyoga.net/",
      description:
        "蒙格尔比哈尔瑜伽学派全球传承中心；Bihar Yoga Bharati 开展高等瑜伽学术教育，国际教学网络影响力显著。",
      tags: ["传承", "教育", "Munger"],
    },
    {
      rank: 5,
      title: "Central Council for Research in Yoga & Naturopathy（CCRYN）",
      url: "http://ccryn.gov.in/",
      description:
        "印度政府瑜伽与自然疗法中央研究理事会，资助与协调全国性研究，服务循证政策与临床研究布局。",
      tags: ["中央研究", "AYUSH", "循证"],
    },
    {
      rank: 6,
      title: "The Yoga Institute（孟买瑜伽学院）",
      url: "https://theyogainstitute.org/",
      description:
        "1918 年创立，常被称为世界最早有组织的瑜伽中心之一，家庭瑜伽与大众教育路径影响深远。",
      tags: ["历史", "教育", "Mumbai"],
    },
    {
      rank: 7,
      title: "Krishnamacharya Yoga Mandiram（KYM）",
      url: "https://kym.org/",
      description:
        "钦奈克里希那玛查亚传统中心，以个体化瑜伽治疗与教师培养著称，获 MDNIY 等认可，国际治疗瑜伽领域影响大。",
      tags: ["瑜伽治疗", "Chennai", "SIRO"],
    },
    {
      rank: 8,
      title: "Ramamani Iyengar Memorial Yoga Institute（RIMYI）",
      url: "https://rimyi.org/",
      description:
        "普纳艾扬格瑜伽全球母院，精准体式教学体系影响欧美及亚洲大量院校与认证课程。",
      tags: ["艾扬格", "Pune", "教学体系"],
    },
    {
      rank: 9,
      title: "Yoga Certification Board（YCB / AYUSH）",
      url: "https://yogacertificationboard.nic.in/",
      description:
        "印度 AYUSH 瑜伽认证委员会，制定并推行国家级瑜伽专业人员认证标准，对国际互认讨论具有制度影响力。",
      tags: ["认证", "标准", "政府"],
    },
    {
      rank: 10,
      title: "Ministry of Ayush — Yoga Portal",
      url: "https://yoga.ayush.gov.in/",
      description:
        "印度政府瑜伽主题门户，汇总国际瑜伽日、课程与机构链接，是检索官方资源的总入口。",
      tags: ["政府门户", "资源导航"],
    },
    {
      rank: 11,
      title: "International Association of Yoga Therapists（IAYT）",
      url: "https://www.iayt.org/",
      description:
        "国际瑜伽治疗专业协会（虽总部不在印度，但与印度院校研究/治疗标准对话密切），提供期刊与专业规范。",
      tags: ["国际协会", "治疗"],
    },
    {
      rank: 12,
      title: "Archive.org — Yoga Collection",
      url: "https://archive.org/search?query=yoga",
      description: "公开领域瑜伽书籍与历史文献扫描，可补充古典文本与早期研究资料。",
      tags: ["文献", "开放获取"],
    },
  ],
};

export function getLinksForPath(pathKey: string): ResourceLink[] {
  return resourceLinksByCategory[pathKey] ?? [];
}
