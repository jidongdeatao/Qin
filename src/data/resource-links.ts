export type ResourceLink = {
  title: string;
  url: string;
  description: string;
  tags?: string[];
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
  others: [
    {
      title: "Yoga Alliance",
      url: "https://www.yogaalliance.org/",
      description: "国际瑜伽教师与学校注册组织。",
      tags: ["教育", "认证"],
    },
    {
      title: "International Association of Yoga Therapists (IAYT)",
      url: "https://www.iayt.org/",
      description: "瑜伽治疗专业协会与期刊资源。",
      tags: ["治疗", "专业"],
    },
    {
      title: "Harvard Health — Yoga",
      url: "https://www.health.harvard.edu/topics/yoga",
      description: "哈佛健康出版关于瑜伽的科普与研究摘要。",
      tags: ["健康", "科普"],
    },
    {
      title: "Mind & Life Institute",
      url: "https://www.mindandlife.org/",
      description: "冥想、正念与科学对话的重要机构。",
      tags: ["意识", "冥想"],
    },
    {
      title: "UCSD Center for Mindfulness",
      url: "https://cih.ucsd.edu/mindfulness",
      description: "加州大学圣地亚哥分校正念中心资源。",
      tags: ["正念", "教育"],
    },
    {
      title: "Oxford Centre for Hindu Studies",
      url: "https://ochs.org.uk/",
      description: "牛津印度教研究中心，含瑜伽与印度思想课程。",
      tags: ["学术", "文化"],
    },
    {
      title: "Digital Corpus of Sanskrit",
      url: "http://www.sanskrit-linguistics.org/dcs/",
      description: "梵语数字语料库，支持语言学与文本研究。",
      tags: ["梵语", "语料"],
    },
    {
      title: "Archive.org — Yoga Collection",
      url: "https://archive.org/search?query=yoga",
      description: "公开领域瑜伽书籍与历史文献扫描。",
      tags: ["文献", "开放"],
    },
  ],
};

export function getLinksForPath(pathKey: string): ResourceLink[] {
  return resourceLinksByCategory[pathKey] ?? [];
}
