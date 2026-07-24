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
  "classical-wisdom/yoga-sutra": [
    {
      title: "《瑜伽经》英译公开文本（Sacred Texts）",
      url: "https://www.sacred-texts.com/hin/yogasutr.htm",
      description: "可在线检索的早期英文译本；适合对照阅读，引用时仍应标注具体译者与版本。",
      tags: ["英文", "公开文本"],
    },
    {
      title: "The Yoga-Sūtra of Patañjali（1890）",
      url: "https://archive.org/details/yogaSutraOfPatanjali",
      description: "Internet Archive 公共领域影印本，含梵文相关说明、英译、附录与传统注疏线索。",
      tags: ["梵文", "英文", "Public Domain"],
    },
    {
      title: "Internet Encyclopedia of Philosophy — Yoga",
      url: "https://iep.utm.edu/yoga/",
      description: "经同行学术编辑的瑜伽哲学概览，介绍帕坦伽利体系、认识论和伦理实践。",
      tags: ["哲学", "学术导读"],
    },
  ],
  "classical-wisdom/upanishads": [
    {
      title: "The Upanishads（Sacred Texts）",
      url: "https://www.sacred-texts.com/hin/upan/index.htm",
      description: "多部主要奥义书的早期英译公开文本入口；现代译本的版权状态需另行核验。",
      tags: ["英文", "公开文本"],
    },
    {
      title: "Internet Archive — Yoga Upanishads",
      url: "https://archive.org/search?query=subject%3A%22Yoga+Upanishads%22",
      description: "瑜伽奥义书历史版本的馆藏检索页，应逐条确认出版年代、扫描质量和使用标识。",
      tags: ["梵文", "数字典藏"],
    },
  ],
  "classical-wisdom/bhagavad-gita": [
    {
      title: "The Bhagavadgītā Word by Word（1905）",
      url: "https://archive.org/details/annie-besant-bhagavadgita-word-by-word",
      description: "Annie Besant 与 Bhagavan Das 的梵文、逐词释义和英译本，标注 Public Domain。",
      tags: ["梵文", "英文", "Public Domain"],
    },
    {
      title: "The Bhagavad-Gita with Saṁskrit Text（1905）",
      url: "https://archive.org/details/bhagavadgitawith00londiala",
      description: "加州大学馆藏影印本，含梵文、逐词与自由英译，可用于版本对照。",
      tags: ["梵英对照", "历史版本"],
    },
  ],
  "classical-wisdom/hatha-classics": [
    {
      title: "Haṭha Yoga Pradīpikā — Sanskrit & English",
      url: "https://archive.org/details/HathaYogaPradipika-SanskritTextWithEnglishTranslatlionAndNotes",
      description: "Pancham Singh 英译与注释的梵英对照本，Internet Archive 标注公共领域。",
      tags: ["哈他瑜伽", "Public Domain"],
    },
    {
      title: "The Gheraṇḍa Saṁhitā（1895）",
      url: "https://archive.org/details/b28140102",
      description: "Wellcome Library 馆藏梵英历史版本，标注 Public Domain Mark。",
      tags: ["梵文", "英文", "Public Domain"],
    },
  ],
  "classical-wisdom/sanskrit-text-libraries": [
    {
      title: "GRETIL — Göttingen Register of Electronic Texts",
      url: "https://gretil.sub.uni-goettingen.de/gretil.html",
      description: "哥廷根大学维护的印度语言电子文本注册库，适合梵文原典检索与数字人文研究。",
      tags: ["梵语", "大学资源"],
    },
    {
      title: "Cologne Digital Sanskrit Dictionaries",
      url: "https://www.sanskrit-lexicon.uni-koeln.de/",
      description: "科隆大学数字梵语词典项目，可交叉检索 Monier-Williams 等历史词典。",
      tags: ["梵语", "词典"],
    },
    {
      title: "Internet Archive — Yoga Collection",
      url: "https://archive.org/search?query=subject%3Ayoga&and%5B%5D=mediatype%3A%22texts%22",
      description: "大规模历史文献检索入口；“可访问”不等于“可自由转载”，下载前须检查每条记录的权利声明。",
      tags: ["影印本", "版权核验"],
    },
  ],
  "modern-science/modern-teachers": [
    {
      title: "Krishnamacharya Yoga Mandiram",
      url: "https://www.kym.org/",
      description: "克里希那玛查亚传统机构官网，提供传承、课程、瑜伽治疗与出版信息。",
      tags: ["现代传承", "官网"],
    },
    {
      title: "Ramamani Iyengar Memorial Yoga Institute",
      url: "https://rimyi.org/",
      description: "艾扬格瑜伽母院官网；用于查找正版著作、官方教学体系和机构资讯。",
      tags: ["艾扬格", "官网"],
    },
    {
      title: "The Divine Life Society",
      url: "https://www.dlshq.org/",
      description: "斯瓦米·悉瓦南达所创机构的官网与出版目录；具体文本使用条件以站内声明为准。",
      tags: ["悉瓦南达", "出版"],
    },
  ],
  "modern-science/anatomy-physiology": [
    {
      title: "PubMed — Yoga Physiology",
      url: "https://pubmed.ncbi.nlm.nih.gov/?term=yoga%5BTitle%2FAbstract%5D+AND+physiology",
      description: "美国国家医学图书馆文献检索结果，可按研究类型、年份和免费全文进一步筛选。",
      tags: ["生理学", "文献检索"],
    },
    {
      title: "PubMed — Yoga and Autonomic Nervous System",
      url: "https://pubmed.ncbi.nlm.nih.gov/?term=yoga+autonomic+nervous+system",
      description: "呼吸、心率变异性与自主神经相关研究入口；研究结论需结合设计质量判断。",
      tags: ["神经生理", "研究"],
    },
  ],
  "modern-science/psychology-consciousness": [
    {
      title: "NIMHANS Integrated Centre for Yoga",
      url: "https://nimhans.ac.in/nimhans-integrated-centre-for-yoga/",
      description: "印度国家心理健康与神经科学研究所的瑜伽临床、培训和神经精神研究中心。",
      tags: ["心理健康", "神经科学"],
    },
    {
      title: "PubMed — Yoga and Mental Health",
      url: "https://pubmed.ncbi.nlm.nih.gov/?term=yoga+mental+health",
      description: "心理健康相关临床与综述文献入口，不能替代个体诊断或专业治疗。",
      tags: ["心理学", "循证"],
    },
  ],
  "modern-science/history-culture": [
    {
      title: "SOAS Haṭha Yoga Project",
      url: "https://www.soas.ac.uk/research/hatha-yoga-project",
      description: "伦敦大学亚非学院历史研究项目，聚焦哈他瑜伽文本、实践与前现代发展。",
      tags: ["瑜伽史", "文本研究"],
    },
    {
      title: "Smithsonian — Yoga: The Art of Transformation",
      url: "https://asia.si.edu/exhibition/yoga-the-art-of-transformation/",
      description: "史密森学会展览资源，从艺术品、手稿与视觉文化观察瑜伽的历史变迁。",
      tags: ["文化史", "博物馆"],
    },
  ],
  "modern-science/medicine-evidence": [
    {
      title: "PubMed",
      url: "https://pubmed.ncbi.nlm.nih.gov/",
      description: "生物医学文献数据库；建议结合 Yoga MeSH、Clinical Trial 和 Systematic Review 过滤器。",
      tags: ["医学", "文献"],
    },
    {
      title: "NCCIH — Yoga for Health: What the Science Says",
      url: "https://www.nccih.nih.gov/health/providers/digest/yoga-for-health-science",
      description: "美国 NIH 下属 NCCIH 面向专业人员的证据摘要，区分潜在获益、局限与安全事项。",
      tags: ["NIH", "证据摘要"],
    },
    {
      title: "Cochrane Library",
      url: "https://www.cochranelibrary.com/",
      description: "系统综述数据库，评估瑜伽干预证据质量。",
      tags: ["循证", "综述"],
    },
    {
      title: "WHO Traditional, Complementary and Integrative Medicine",
      url: "https://www.who.int/health-topics/traditional-complementary-and-integrative-medicine",
      description: "世界卫生组织传统、补充与整合医学政策和公共卫生资料入口。",
      tags: ["WHO", "公共卫生"],
    },
  ],
  "modern-science/mindfulness-meditation": [
    {
      title: "PubMed — Yoga, Meditation and Mindfulness",
      url: "https://pubmed.ncbi.nlm.nih.gov/?term=%28yoga+OR+meditation%29+AND+mindfulness",
      description: "正念、冥想与瑜伽交叉研究检索入口，可继续筛选随机对照试验和系统综述。",
      tags: ["正念", "冥想", "研究"],
    },
    {
      title: "NCCIH — Meditation and Mindfulness",
      url: "https://www.nccih.nih.gov/health/meditation-and-mindfulness-effectiveness-and-safety",
      description: "对冥想与正念有效性、安全性和现有证据局限的公众健康概览。",
      tags: ["安全", "证据"],
    },
  ],
  "modern-science/movement-health": [
    {
      title: "NCCIH — Yoga: Effectiveness and Safety",
      url: "https://www.nccih.nih.gov/health/yoga-effectiveness-and-safety",
      description: "涵盖疼痛、平衡、健康与伤害风险的证据概览，强调合格指导和个体调整。",
      tags: ["运动健康", "安全"],
    },
    {
      title: "WHO Guidelines on Physical Activity",
      url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
      description: "世界卫生组织身体活动建议，可用于理解瑜伽在整体运动健康中的位置。",
      tags: ["运动", "WHO"],
    },
  ],
  "techniques/asana": [
    {
      title: "AYUSH Common Yoga Protocol",
      url: "https://yoga.ayush.gov.in/public/assets/front/pdf/CYPEnglishLeaflet.pdf",
      description: "印度 AYUSH 发布的基础练习协议，含热身、体式、呼吸和注意事项；不替代医疗建议。",
      tags: ["官方协议", "体式"],
    },
    {
      title: "WHO Benchmarks for Training in Yoga",
      url: "https://iris.who.int/handle/10665/330738",
      description: "WHO 对瑜伽培训知识、技能、安全、禁忌证和专业标准的参考文件。",
      tags: ["WHO", "安全标准"],
    },
  ],
  "techniques/pranayama": [
    {
      title: "AYUSH Common Yoga Protocol — Prāṇāyāma",
      url: "https://yoga.ayush.gov.in/public/assets/front/pdf/CYPEnglishLeaflet.pdf",
      description: "基础呼吸觉察与调息示范；屏息和强力呼吸法应在合格教师指导下学习。",
      tags: ["调息", "官方协议"],
    },
    {
      title: "PubMed — Pranayama Research",
      url: "https://pubmed.ncbi.nlm.nih.gov/?term=pranayama",
      description: "调息法生理与临床研究入口，需关注样本量、对照组和技术定义差异。",
      tags: ["呼吸科学", "文献"],
    },
  ],
  "techniques/shatkarma-bandha-mudra": [
    {
      title: "WHO Benchmarks — Shatkarma and Safety",
      url: "https://iris.who.int/handle/10665/330738",
      description: "介绍清洁法培训应涵盖的方法、预防措施和禁忌证；侵入性技术不宜照网页自行尝试。",
      tags: ["清洁术", "风险提示"],
    },
    {
      title: "Haṭha Yoga Pradīpikā — Historical Source",
      url: "https://archive.org/details/HathaYogaPradipika-SanskritTextWithEnglishTranslatlionAndNotes",
      description: "收束法、手印和清洁法的传统文献来源，仅供文本研究，不等同于现代临床操作指南。",
      tags: ["传统来源", "梵英对照"],
    },
  ],
  "techniques/meditation": [
    {
      title: "AYUSH Common Yoga Protocol — Dhyāna",
      url: "https://yoga.ayush.gov.in/public/assets/front/pdf/CYPEnglishLeaflet.pdf",
      description: "基础冥想和呼吸觉察示例，适合作为安全入门框架。",
      tags: ["冥想", "官方协议"],
    },
    {
      title: "NCCIH — Meditation and Mindfulness",
      url: "https://www.nccih.nih.gov/health/meditation-and-mindfulness-effectiveness-and-safety",
      description: "冥想潜在效益、研究限制与不良体验说明；严重心理困扰者应寻求专业支持。",
      tags: ["安全", "现代研究"],
    },
  ],
  "techniques/yoga-nidra": [
    {
      title: "PubMed — Yoga Nidra",
      url: "https://pubmed.ncbi.nlm.nih.gov/?term=%22yoga+nidra%22",
      description: "瑜伽休息术临床和生理研究入口；不同研究所用脚本与时长并不统一。",
      tags: ["休息术", "研究"],
    },
    {
      title: "Bihar School of Yoga Publications",
      url: "https://www.biharyoga.net/publications.php",
      description: "Yoga Nidra 现代体系相关传承机构的官方出版入口，避免转载仍受版权保护的脚本全文。",
      tags: ["正版出版", "版权"],
    },
  ],
  "techniques/sound-mantra": [
    {
      title: "Oxford Centre for Hindu Studies — Mantra",
      url: "https://ochsonline.org/",
      description: "印度宗教、梵文与传统研究课程入口，可用于建立唱诵和曼陀罗的学术背景。",
      tags: ["曼陀罗", "学术"],
    },
  ],
  "research-institutions/global": [
    {
      title: "NCCIH",
      url: "https://www.nccih.nih.gov/",
      description: "美国国立卫生研究院下属补充与整合健康研究中心，资助并传播严谨健康研究。",
      tags: ["美国", "医学研究"],
    },
    {
      title: "International Association of Yoga Therapists",
      url: "https://www.iayt.org/",
      description: "国际瑜伽治疗专业协会，提供认证信息、专业规范及 International Journal of Yoga Therapy。",
      tags: ["国际协会", "瑜伽治疗"],
    },
    {
      title: "NIMHANS Integrated Centre for Yoga",
      url: "https://nimhans.ac.in/nimhans-integrated-centre-for-yoga/",
      description: "将瑜伽纳入心理与神经医学服务、培训和科学研究的专业中心。",
      tags: ["印度", "神经精神"],
    },
  ],
  "research-institutions/journals-databases": [
    {
      title: "International Journal of Yoga",
      url: "https://journals.lww.com/ijoy/pages/default.aspx",
      description: "S-VYASA 相关同行评审期刊，刊载瑜伽临床、哲学与跨学科研究。",
      tags: ["学术期刊", "同行评审"],
    },
    {
      title: "Yoga Mīmāṃsā",
      url: "https://journals.lww.com/yomi/pages/default.aspx",
      description: "创刊于 1924 年的瑜伽科学与文化期刊，由 Kaivalyadhama 传统发起。",
      tags: ["学术期刊", "历史"],
    },
    {
      title: "PubMed — Yoga",
      url: "https://pubmed.ncbi.nlm.nih.gov/?term=yoga",
      description: "瑜伽相关生物医学论文的动态检索页，可使用文章类型与免费全文过滤器。",
      tags: ["数据库", "医学"],
    },
    {
      title: "ClinicalTrials.gov — Yoga",
      url: "https://clinicaltrials.gov/search?intr=yoga",
      description: "已注册瑜伽干预临床研究入口；注册不等于研究已完成或疗效获得证实。",
      tags: ["临床试验", "注册库"],
    },
  ],
  "research-institutions/india": [
    {
      title: "Morarji Desai National Institute of Yoga",
      url: "https://www.yogamdniy.nic.in/",
      description: "印度 AYUSH 部国家级瑜伽研究所，开展标准、教育、研究与公众健康项目。",
      tags: ["国家级", "新德里"],
    },
    {
      title: "S-VYASA University — Centre of Excellence",
      url: "https://www.svyasa.edu.in/coe.php",
      description: "AYUSH 认可的瑜伽卓越中心，开展分子、生理、神经认知与临床研究。",
      tags: ["大学", "班加罗尔"],
    },
    {
      title: "Kaivalyadhama Yoga Institute",
      url: "https://kdham.com/",
      description: "1924 年创立，长期开展瑜伽生理、哲学文献与瑜伽治疗研究。",
      tags: ["研究机构", "Lonavala"],
    },
    {
      title: "Central Council for Research in Yoga & Naturopathy",
      url: "https://ccryn.gov.in/",
      description: "印度政府瑜伽与自然疗法研究理事会，协调和支持研究、培训与公共项目。",
      tags: ["政府研究", "AYUSH"],
    },
  ],
  /**
   * 原“其他”目录完整保留。
   * 排序为编辑性综合整理，并非官方排名。
   */
  "research-institutions/institution-directory": [
    {
      rank: 1,
      title: "S-VYASA University（斯瓦米维韦卡南达瑜伽大学）",
      url: "https://www.svyasa.edu.in/",
      description:
        "班加罗尔瑜伽专业 deemed-to-be university，开展学位教育、跨学科研究与国际合作。",
      tags: ["大学", "研究", "班加罗尔"],
    },
    {
      rank: 2,
      title: "Morarji Desai National Institute of Yoga（MDNIY）",
      url: "https://www.yogamdniy.nic.in/",
      description:
        "印度 AYUSH 部国家级瑜伽研究所，承担标准、教育培训、研究与公众推广。",
      tags: ["国家级", "AYUSH", "新德里"],
    },
    {
      rank: 3,
      title: "Kaivalyadhama Yoga Institute（凯瓦利亚达玛）",
      url: "https://kdham.com/",
      description:
        "1924 年创立的瑜伽科学研究机构，兼具科研、教育、文献研究与健康服务。",
      tags: ["研究机构", "历史", "Lonavala"],
    },
    {
      rank: 4,
      title: "Bihar School of Yoga / Bihar Yoga Bharati",
      url: "https://www.biharyoga.net/",
      description:
        "蒙格尔比哈尔瑜伽传统中心，开展系统教学、出版与瑜伽生活方式教育。",
      tags: ["传承", "教育", "Munger"],
    },
    {
      rank: 5,
      title: "Central Council for Research in Yoga & Naturopathy（CCRYN）",
      url: "https://ccryn.gov.in/",
      description:
        "印度政府瑜伽与自然疗法中央研究理事会，支持研究与公共健康项目。",
      tags: ["中央研究", "AYUSH", "循证"],
    },
    {
      rank: 6,
      title: "The Yoga Institute（孟买瑜伽学院）",
      url: "https://theyogainstitute.org/",
      description:
        "1918 年创立的历史性瑜伽机构，以家庭瑜伽、大众教育和教师培训闻名。",
      tags: ["历史", "教育", "Mumbai"],
    },
    {
      rank: 7,
      title: "Krishnamacharya Yoga Mandiram（KYM）",
      url: "https://www.kym.org/",
      description:
        "钦奈克里希那玛查亚传统中心，以个体化教学、瑜伽治疗与教师培养著称。",
      tags: ["瑜伽治疗", "Chennai"],
    },
    {
      rank: 8,
      title: "Ramamani Iyengar Memorial Yoga Institute（RIMYI）",
      url: "https://rimyi.org/",
      description:
        "普纳艾扬格瑜伽母院，保存并发展其体式、调息与辅助工具教学体系。",
      tags: ["艾扬格", "Pune", "教学体系"],
    },
    {
      rank: 9,
      title: "Yoga Certification Board（YCB / AYUSH）",
      url: "https://yogacertificationboard.nic.in/",
      description:
        "印度 AYUSH 瑜伽认证委员会，发布专业人员与机构认证框架。",
      tags: ["认证", "标准", "政府"],
    },
    {
      rank: 10,
      title: "Ministry of Ayush — Yoga Portal",
      url: "https://yoga.ayush.gov.in/",
      description:
        "印度政府瑜伽主题门户，汇集国际瑜伽日、公共协议和机构资源。",
      tags: ["政府门户", "资源导航"],
    },
    {
      rank: 11,
      title: "International Association of Yoga Therapists（IAYT）",
      url: "https://www.iayt.org/",
      description:
        "国际瑜伽治疗专业协会，提供专业规范、认证信息与学术期刊。",
      tags: ["国际协会", "治疗"],
    },
    {
      rank: 12,
      title: "Internet Archive — Yoga Collection",
      url: "https://archive.org/search?query=yoga",
      description: "历史书籍与影音资料检索入口；使用前需逐项核验权利声明。",
      tags: ["文献", "数字典藏"],
    },
  ],
  "retreats-world/india-asia": [
    {
      title: "Sivananda Ashrams — India & Asia",
      url: "https://sivananda.org/locations/ashrams/",
      description: "国际悉瓦南达网络官方目录，含印度南部、喜马拉雅和越南等住宿型修习中心。",
      tags: ["印度", "越南", "传统"],
    },
    {
      title: "Phool Chatti Ashram — Rishikesh",
      url: "https://phoolchattiyoga.com/",
      description: "位于印度瑞诗凯诗附近的传统静修院，官网提供课程、住宿和抵达信息。",
      tags: ["印度", "Rishikesh"],
    },
    {
      title: "Earth Yoga Village — Goa",
      url: "https://www.earthyogavillage.com/yoga-community-goa",
      description: "印度果阿的瑜伽社区与静修空间，提供沉浸式住宿、课程及教师培训。",
      tags: ["印度", "生态社区"],
    },
    {
      title: "Lumŭma Yoga Village — India & Nepal",
      url: "https://www.lumuma.com/",
      description: "在印度 Varkala 与尼泊尔 Pokhara 运营的瑜伽村，结合静修、自然生活与课程。",
      tags: ["印度", "尼泊尔"],
    },
    {
      title: "Ubud Yoga Village — Bali",
      url: "https://ubudyogavillage.com/",
      description: "印度尼西亚乌布的瑜伽生态社区项目；开放状态和项目进度请直接向机构确认。",
      tags: ["印尼", "生态村"],
    },
  ],
  "retreats-world/europe": [
    {
      title: "Sivananda Ashrams — France & Austria",
      url: "https://sivananda.org/locations/ashrams/",
      description: "官方全球目录包含法国奥尔良与奥地利 Tyrol 的住宿型传统瑜伽中心。",
      tags: ["法国", "奥地利"],
    },
    {
      title: "Arhanta Yoga Ashram — Netherlands",
      url: "https://www.arhantayoga.org/ashrams-centers/",
      description: "位于荷兰 Gelderland 的住宿型瑜伽学院；官网同时列出其印度中心。",
      tags: ["荷兰", "培训"],
    },
    {
      title: "Mandali Retreat Center — Italy",
      url: "https://www.mandali.org/",
      description: "意大利北部山地静修中心，接待瑜伽、冥想与身心课程。",
      tags: ["意大利", "山地静修"],
    },
  ],
  "retreats-world/americas": [
    {
      title: "Kripalu Center for Yoga & Health",
      url: "https://kripalu.org/",
      description: "美国马萨诸塞州非营利瑜伽与正念教育、静修中心。",
      tags: ["美国", "非营利"],
    },
    {
      title: "Sivananda Yoga Ranch — New York",
      url: "https://sivanandayogaranch.org/",
      description: "1974 年创立的山地静修中心，提供古典瑜伽、冥想和住宿项目。",
      tags: ["美国", "传统"],
    },
    {
      title: "Sivananda Ashram Yoga Retreat — Bahamas",
      url: "https://sivanandabahamas.org/",
      description: "巴哈马 Paradise Island 的住宿型瑜伽静修院，官网提供日程与访问要求。",
      tags: ["巴哈马", "海岛静修"],
    },
    {
      title: "Sivananda Ashram Yoga Camp — Canada",
      url: "https://sivananda.org/locations/ashrams/",
      description: "全球目录中的加拿大魁北克 Val-Morin 静修中心。",
      tags: ["加拿大", "传统"],
    },
  ],
  "retreats-world/oceania-africa": [
    {
      title: "Satyananda Yoga Academy Australia",
      url: "https://www.satyananda.net/",
      description: "澳大利亚 Satyananda 传统机构入口，可核对课程、静修与所在地最新信息。",
      tags: ["澳大利亚", "Satyananda"],
    },
    {
      title: "Emoyeni Retreat Centre — South Africa",
      url: "https://www.emoyeni.org.za/",
      description: "南非自然环境中的非营利静修中心，承办瑜伽与冥想项目。",
      tags: ["南非", "非营利"],
    },
  ],
  "retreats-world/global-networks": [
    {
      title: "Sivananda Ashrams Worldwide",
      url: "https://sivananda.org/locations/ashrams/",
      description: "覆盖印度、欧洲、北美、加勒比与越南的官方静修院目录，可从统一入口核验分支。",
      tags: ["全球网络", "官方目录"],
    },
    {
      title: "International Yoga Federation Directory",
      url: "https://www.internationalyogafederation.net/",
      description: "国际瑜伽组织入口之一；收录不代表本站背书，师资、保险和安全制度仍需独立核验。",
      tags: ["目录", "核验"],
    },
  ],
};

export function getLinksForPath(pathKey: string): ResourceLink[] {
  return resourceLinksByCategory[pathKey] ?? [];
}
