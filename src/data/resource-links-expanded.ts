import type { ResourceLink } from "./resource-links";

/**
 * Second-stage curation. Kept separate from the foundational directory so
 * newly reviewed sources remain easy to audit and update.
 */
export const additionalResourceLinksByCategory: Record<string, ResourceLink[]> = {
  "classical-wisdom/yoga-sutra": [
    {
      title: "Project Gutenberg — The Yoga Sutras of Patanjali",
      url: "https://www.gutenberg.org/ebooks/2526",
      description:
        "Charles Johnston 1912 年英译本，可全文检索和下载。Project Gutenberg 标注其在美国属于公版；其他法域仍需按当地期限判断。",
      tags: ["瑜伽经", "历史英译", "全文"],
      access: "公共版权",
      languages: ["English"],
    },
    {
      title: "Penn Libraries — Yoga Sūtra Sanskrit Manuscript",
      url: "https://openn.library.upenn.edu/Data/0002/html/mscoll390_item1923.html",
      description:
        "宾夕法尼亚大学馆藏《瑜伽经》及相关释论梵文手稿高清影像，内容使用 Public Domain Mark，元数据采用 CC BY 4.0。",
      tags: ["梵文手稿", "大学典藏", "Public Domain"],
      access: "公共版权",
      languages: ["संस्कृत", "English"],
    },
  ],
  "classical-wisdom/upanishads": [
    {
      title: "Project Gutenberg — The Upanishads",
      url: "https://www.gutenberg.org/ebooks/3283",
      description:
        "收录 Katha、Isha、Kena 等奥义书的早期英译，可在线阅读和下载；公版标识基于美国法域。",
      tags: ["奥义书", "历史英译", "全文"],
      access: "公共版权",
      languages: ["English"],
    },
    {
      title: "Online Library of Liberty — Thirteen Principal Upanishads",
      url: "https://oll.libertyfund.org/titles/hume-the-thirteen-principal-upanishads",
      description:
        "Robert Ernest Hume 1921 年十三部主要奥义书英译，提供 HTML、电子书与影印版，适合版本对照。",
      tags: ["十三奥义书", "学术英译", "版本对照"],
      access: "参考资料",
      languages: ["English"],
    },
  ],
  "classical-wisdom/bhagavad-gita": [
    {
      title: "University of Hyderabad — Gītā Grammar Reader",
      url: "https://sanskrit.uohyd.ac.in/scl/e-readers/sbg/main.html",
      description:
        "逐句呈现 padapāṭha、词形、句法关系与复合词分析的大学电子阅读器，适合梵文精读。",
      tags: ["大学资源", "语法分析", "逐词阅读"],
      access: "机构官网",
      languages: ["संस्कृत", "English"],
    },
    {
      title: "Penn Libraries — Bhagavad Gītā Manuscript",
      url: "https://openn.library.upenn.edu/Data/0002/html/mscoll390_item555.html",
      description:
        "宾夕法尼亚大学 Kislak 中心梵文手稿与高清图像，馆方以 Public Domain Mark 标识内容。",
      tags: ["梵文手稿", "大学典藏", "Public Domain"],
      access: "公共版权",
      languages: ["संस्कृत", "English"],
    },
  ],
  "classical-wisdom/hatha-classics": [
    {
      title: "Heidelberg University — Gheraṇḍa Saṁhitā 1895",
      url: "https://digi.ub.uni-heidelberg.de/diglit/vasu1895",
      description:
        "海德堡大学图书馆提供 Srisa Chandra Vasu 版高清影印和书目结构，可核对原版页码。",
      tags: ["格兰达本集", "大学数字馆藏", "影印本"],
      access: "开放获取",
      languages: ["संस्कृत", "English"],
    },
    {
      title: "Sanskrit Documents — Śiva Saṁhitā",
      url: "https://sanskritdocuments.org/doc_shiva/shivasaMhitA.html",
      description:
        "可检索的天城体《湿婆本集》梵文文本；站方限定个人学习研究，不应复制到其他网站。",
      tags: ["湿婆本集", "梵文全文", "使用限制"],
      access: "参考资料",
      languages: ["संस्कृत"],
    },
  ],
  "classical-wisdom/sanskrit-text-libraries": [
    {
      title: "SARIT — Search and Retrieval of Indic Texts",
      url: "https://sarit.indology.info/apps/sarit-pm/docs/welcome.html",
      description:
        "提供版本来源、修订记录与 TEI 标记的梵文和印度语言电子文本，各文本按具体许可开放研究使用。",
      tags: ["TEI", "数字人文", "可引用版本"],
      access: "研究入口",
      languages: ["संस्कृत", "English"],
    },
    {
      title: "Muktabodha Digital Library",
      url: "https://muktabodha.org/digital-library/",
      description:
        "保存梵文手稿与可检索文本，重点覆盖湿婆、性力、吠陀和纳特传统；使用时需查看具体条款。",
      tags: ["手稿", "电子文本", "印度学"],
      access: "研究入口",
      languages: ["संस्कृत", "English"],
    },
  ],
  "modern-science/modern-teachers": [
    {
      title: "Krishnamurti Foundation Trust Archive",
      url: "https://www.krishnamurti.org/",
      description:
        "基金会维护的讲座、录音、影像、文字记录和书信入口；资料仍由相关权利人管理。",
      tags: ["克里希那穆提", "思想档案", "影音资料"],
      access: "机构官网",
      languages: ["English", "多语种"],
    },
    {
      title: "Sri Aurobindo Complete Works Library",
      url: "https://www.sriaurobindo.center/sriaurobindo-library",
      description:
        "奥罗宾多全集官方阅读入口，内容仅供个人学习，未经授权不得复制传播。",
      tags: ["奥罗宾多", "整体瑜伽", "官方文献"],
      access: "机构官网",
      languages: ["English"],
    },
  ],
  "modern-science/anatomy-physiology": [
    {
      title: "Biomechanical Demands of Standing Yoga Poses",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3557154/",
      description:
        "使用关节力矩和肌电测量七种站立体式对老年人的下肢负荷，文章采用 CC BY 2.0。",
      tags: ["生物力学", "肌电", "老年人"],
      access: "开放获取",
      languages: ["English"],
    },
    {
      title: "Prāṇāyāma Physiological Mechanisms Review",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10837615/",
      description:
        "从呼吸、循环、自主神经、边缘系统和皮层层面整理调息机制，同时说明证据局限。",
      tags: ["调息", "自主神经", "生理机制"],
      access: "开放获取",
      languages: ["English"],
    },
  ],
  "modern-science/psychology-consciousness": [
    {
      title: "Neuroscience of the Yogic Theory of Consciousness",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8675243/",
      description:
        "把《瑜伽经》的心识、专注与三摩地框架同神经科学问题对照，并提出可检验假说。",
      tags: ["意识研究", "神经科学", "瑜伽心理学"],
      access: "开放获取",
      languages: ["English"],
    },
    {
      title: "Western and Yogic Psychology: Compatibility Review",
      url: "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1554014/full",
      description:
        "比较两种传统的认识论与心智概念，提醒将传统术语直接科学化可能造成失真。",
      tags: ["认识论", "跨文化心理学", "同行评审"],
      access: "开放获取",
      languages: ["English"],
    },
  ],
  "modern-science/history-culture": [
    {
      title: "EU CORDIS — Haṭha Yoga Project Results",
      url: "https://cordis.europa.eu/project/id/647963/reporting",
      description:
        "欧盟官方项目页，汇集 ERC 哈他瑜伽研究的文本校勘、田野调查、数据库与出版成果。",
      tags: ["欧盟研究", "哈他瑜伽史", "项目成果"],
      access: "机构官网",
      languages: ["English"],
    },
    {
      title: "Yoga Diagrams Archive",
      url: "https://www.yogadiagrams.com/",
      description:
        "整理 1880–1913 年间瑜伽身体图与多语种出版史；在线展示不等于现代译文可自由转载。",
      tags: ["视觉文化", "身体图", "现代瑜伽史"],
      access: "参考资料",
      languages: ["English", "多语种"],
    },
  ],
  "modern-science/medicine-evidence": [
    {
      title: "AHRQ — Noninvasive Treatments for Chronic Pain",
      url: "https://www.ncbi.nlm.nih.gov/books/NBK556229/",
      description:
        "美国 AHRQ 比较效果综述，分别评价瑜伽、运动与正念对疼痛和功能的证据强度。",
      tags: ["AHRQ", "慢性疼痛", "系统综述"],
      access: "开放获取",
      languages: ["English"],
    },
    {
      title: "US Veterans Affairs — Yoga Evidence Map",
      url: "https://www.hsrd.research.va.gov/publications/esp/yoga.cfm",
      description:
        "政府证据综合项目，评估瑜伽对多种健康状况的获益与伤害，并标明原始研究质量限制。",
      tags: ["VA", "证据图谱", "临床决策"],
      access: "研究入口",
      languages: ["English"],
    },
  ],
  "modern-science/mindfulness-meditation": [
    {
      title: "Brown University Mindfulness Center Research",
      url: "https://mindfulness.sph.brown.edu/research",
      description:
        "涵盖正念神经科学、精神医学、实施科学、不良事件与创伤敏感性研究。",
      tags: ["大学研究中心", "不良事件", "实施科学"],
      access: "机构官网",
      languages: ["English"],
    },
    {
      title: "Mindfulness Programs Meta-analysis — PLOS Medicine",
      url: "https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1003481",
      description:
        "综合非临床成人随机试验并比较不同环境和对照条件的同行评审开放文章。",
      tags: ["荟萃分析", "随机试验", "CC BY"],
      access: "开放获取",
      languages: ["English"],
    },
  ],
  "modern-science/movement-health": [
    {
      title: "Cochrane — Yoga for Chronic Low Back Pain",
      url: "https://www.cochrane.org/evidence/CD010671_yoga-chronic-non-specific-low-back-pain",
      description:
        "证据摘要显示相对不运动的改善可能较小，并报告背痛不良事件；不能替代个体化康复建议。",
      tags: ["腰痛", "Cochrane", "不良事件"],
      access: "开放获取",
      languages: ["English"],
    },
    {
      title: "Standing Yoga Poses: Benefits and Injury Risks",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8391656/",
      description:
        "量化五种站立体式的髋、膝、踝负荷，讨论不同康复场景的选择限制。",
      tags: ["下肢康复", "关节力矩", "风险评估"],
      access: "开放获取",
      languages: ["English"],
    },
  ],
  "techniques/asana": [
    {
      title: "Yoga Adverse Events — Case Report Review",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3797727/",
      description:
        "汇总体式和强力呼吸相关病例。病例不能估算发生率，但提示极端体式需结合个人风险调整。",
      tags: ["体式安全", "不良事件", "系统综述"],
      access: "开放获取",
      languages: ["English"],
    },
    {
      title: "The Safety of Yoga — Trial Meta-analysis",
      url: "https://pubmed.ncbi.nlm.nih.gov/26116216/",
      description:
        "随机试验综合显示瑜伽总体与常规照护或运动安全性相近，但伤害报告普遍不充分。",
      tags: ["体式", "安全性", "荟萃分析"],
      access: "研究入口",
      languages: ["English"],
    },
  ],
  "techniques/pranayama": [
    {
      title: "Breathing Exercises, Blood Pressure and Heart Rate Review",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10765252/",
      description:
        "呼吸练习可能影响血压和心率，但技术定义与研究质量不一，不能替代降压治疗。",
      tags: ["调息", "血压", "系统综述"],
      access: "开放获取",
      languages: ["English"],
    },
    {
      title: "Breathing Techniques in Serious Respiratory Disease",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11522968/",
      description:
        "欧洲呼吸学会证据综述的一部分；慢性呼吸疾病患者应在临床人员指导下练习。",
      tags: ["调息", "呼吸疾病", "临床证据"],
      access: "开放获取",
      languages: ["English"],
    },
  ],
  "techniques/shatkarma-bandha-mudra": [
    {
      title: "Shatkarma Evidence Review",
      url: "https://pubmed.ncbi.nlm.nih.gov/33454186/",
      description:
        "现有清洁术研究数量少且设计较弱，不能支持广泛治疗宣称；侵入性操作不宜照网页自学。",
      tags: ["清洁术", "证据综述", "Shatkarma"],
      access: "研究入口",
      languages: ["English"],
    },
    {
      title: "FDA — Neti Pot Safety",
      url: "https://www.fda.gov/consumers/consumer-updates/rinsing-your-sinuses-neti-pots-safe",
      description:
        "鼻腔冲洗必须使用蒸馏水、无菌水或充分煮沸冷却的水，并彻底清洁器具。",
      tags: ["Neti", "FDA", "感染预防"],
      access: "机构官网",
      languages: ["English"],
    },
  ],
  "techniques/meditation": [
    {
      title: "Meditation Programs for Psychological Stress",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4142584/",
      description:
        "主动对照研究显示焦虑、抑郁与疼痛可能小幅改善，但不能替代精神科或心理治疗。",
      tags: ["冥想", "心理健康", "系统综述"],
      access: "开放获取",
      languages: ["English"],
    },
    {
      title: "Meditation Adverse Events Systematic Review",
      url: "https://pubmed.ncbi.nlm.nih.gov/32820538/",
      description:
        "整理焦虑、抑郁及认知异常等不良体验；高风险人群应采用创伤知情指导。",
      tags: ["冥想安全", "不良事件", "系统综述"],
      access: "研究入口",
      languages: ["English"],
    },
  ],
  "techniques/yoga-nidra": [
    {
      title: "Yoga Nidra for Hypertension — Meta-analysis",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10950755/",
      description:
        "部分研究提示血压变化，但总体偏倚风险高，不可替代药物、监测或医疗随访。",
      tags: ["Yoga Nidra", "高血压", "证据局限"],
      access: "开放获取",
      languages: ["English"],
    },
    {
      title: "iRest Yoga Nidra Pilot Study",
      url: "https://pubmed.ncbi.nlm.nih.gov/24165520/",
      description:
        "小样本无对照研究提示压力评分可能改善，无法排除期待效应，不构成疗效定论。",
      tags: ["iRest", "大学生", "初步证据"],
      access: "研究入口",
      languages: ["English"],
    },
  ],
  "techniques/sound-mantra": [
    {
      title: "Mantra Meditation and Mental Health Review",
      url: "https://www.mdpi.com/1660-4601/19/6/3380",
      description:
        "随机试验综合显示部分心理指标可能改善，但偏倚和长期随访不足。",
      tags: ["曼陀罗", "心理健康", "荟萃分析"],
      access: "开放获取",
      languages: ["English"],
    },
    {
      title: "OM Group Chanting Pilot Study",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11576810/",
      description:
        "短时小样本实验观察到焦虑和皮质醇变化，不能证明治疗效果。",
      tags: ["OM", "唱诵", "初步研究"],
      access: "开放获取",
      languages: ["English"],
    },
  ],
  "research-institutions/india": [
    {
      title: "AIIMS Centre for Integrative Medicine and Research",
      url: "https://aiims.edu/index.php/en/intro_cimr",
      description:
        "全印医学科学院新德里院区的整合医学研究中心，开展瑜伽与现代医学合作研究。",
      tags: ["AIIMS", "临床研究", "整合医学"],
      access: "机构官网",
      languages: ["English", "हिन्दी"],
    },
    {
      title: "Central University of Rajasthan — Department of Yoga",
      url: "https://www.curaj.ac.in/departments/department-yoga",
      description:
        "印度中央大学瑜伽系，提供瑜伽治疗教学、博士培养和科研项目信息。",
      tags: ["大学", "瑜伽治疗", "Rajasthan"],
      access: "机构官网",
      languages: ["English"],
    },
  ],
  "research-institutions/global": [
    {
      title: "SOAS Centre of Yoga Studies",
      url: "https://www.soas.ac.uk/research/centres-and-institutes/centre-yoga-studies",
      description:
        "伦敦大学亚非学院研究中心，侧重瑜伽历史、哲学、文献学与跨文化研究。",
      tags: ["SOAS", "瑜伽史", "文献学"],
      access: "机构官网",
      languages: ["English"],
    },
    {
      title: "YogaX at Stanford Psychiatry",
      url: "https://yogax.stanford.edu/",
      description:
        "斯坦福医学院精神病学与行为科学系项目，关注治疗性瑜伽、心理韧性与医疗整合。",
      tags: ["Stanford", "心理健康", "治疗性瑜伽"],
      access: "机构官网",
      languages: ["English"],
    },
  ],
  "research-institutions/journals-databases": [
    {
      title: "AYUSH Research Portal",
      url: "https://arp.ayush.gov.in/",
      description:
        "印度 AYUSH 部研究数据库；收录不代表研究结论获得政府认可，仍需独立评价质量。",
      tags: ["AYUSH", "研究数据库", "印度政府"],
      access: "研究入口",
      languages: ["English", "हिन्दी"],
    },
    {
      title: "Journal of Yoga Studies",
      url: "https://journalofyogastudies.org/index.php/JoYS",
      description:
        "同行评审、钻石开放获取期刊，专注瑜伽历史、宗教、哲学、文献学和社会科学。",
      tags: ["人文社科", "同行评审", "钻石开放获取"],
      access: "开放获取",
      languages: ["English"],
    },
  ],
  "retreats-world/india-asia": [
    {
      title: "Sadhana Mandir Ashram — Rishikesh",
      url: "https://sadhanamandir.org/",
      description:
        "恒河畔喜马拉雅瑜伽传统静修院，官网公布住宿项目、申请方式与最新日程。",
      tags: ["印度", "瑞诗凯诗", "住宿静修"],
      access: "机构官网",
      languages: ["English"],
    },
    {
      title: "Samahita Retreat — Thailand",
      url: "https://www.samahitaretreat.com/",
      description:
        "泰国苏梅岛住宿型瑜伽中心，提供瑜伽、呼吸、冥想与教师教育项目。",
      tags: ["泰国", "苏梅岛", "海滨"],
      access: "机构官网",
      languages: ["English"],
    },
    {
      title: "Hariharalaya — Cambodia",
      url: "https://hariharalaya.com/",
      description:
        "柬埔寨暹粒的住宿型瑜伽与冥想中心，官网列有课程日程和访问条件。",
      tags: ["柬埔寨", "瑜伽村", "冥想"],
      access: "机构官网",
      languages: ["English"],
    },
  ],
  "retreats-world/europe": [
    {
      title: "Mandala Yoga Ashram — Wales",
      url: "https://www.mandalayogaashram.com/",
      description:
        "英国威尔士乡间住宿型瑜伽静修院，提供瑜伽、冥想与哲学课程。",
      tags: ["英国", "威尔士", "住宿静修"],
      access: "机构官网",
      languages: ["English"],
    },
    {
      title: "Hridaya Yoga France",
      url: "https://hridaya-yoga.com/centers/hridaya-yoga-france/",
      description:
        "法国博若莱地区非营利瑜伽与冥想中心，提供住宿、静默课程和志愿项目。",
      tags: ["法国", "非营利", "冥想"],
      access: "机构官网",
      languages: ["English", "Français"],
    },
    {
      title: "Vale de Moses — Portugal",
      url: "https://www.valedemoses.com/",
      description:
        "葡萄牙中部森林山谷中的住宿型静修场地，接待瑜伽与身心活动。",
      tags: ["葡萄牙", "森林静修", "素食"],
      access: "机构官网",
      languages: ["English"],
    },
  ],
  "retreats-world/americas": [
    {
      title: "Mount Madonna Center — California",
      url: "https://mountmadonna.org/",
      description:
        "美国圣克鲁斯山地瑜伽社区与静修中心，提供个人住宿及课程。",
      tags: ["美国", "瑜伽社区", "个人静修"],
      access: "机构官网",
      languages: ["English"],
    },
    {
      title: "Omega Institute — New York",
      url: "https://www.eomega.org/yoga-retreats-workshops",
      description:
        "美国纽约州非营利住宿教育中心，官网持续公布瑜伽和冥想工作坊。",
      tags: ["美国", "非营利", "工作坊"],
      access: "机构官网",
      languages: ["English"],
    },
    {
      title: "Blue Spirit — Costa Rica",
      url: "https://bluespiritcostarica.com/",
      description:
        "哥斯达黎加 Nosara 海岸附近的瑜伽与冥想住宿中心，主要承接团体项目。",
      tags: ["哥斯达黎加", "海滨", "团体静修"],
      access: "机构官网",
      languages: ["English"],
    },
  ],
  "retreats-world/oceania-africa": [
    {
      title: "Anahata Yoga Retreat — New Zealand",
      url: "https://www.anahata-retreat.org.nz/",
      description:
        "新西兰 Golden Bay 原生森林中的非营利瑜伽社区和住宿中心。",
      tags: ["新西兰", "非营利", "生态社区"],
      access: "机构官网",
      languages: ["English"],
    },
    {
      title: "Byron Yoga Centre — Australia",
      url: "https://www.byronyoga.com/",
      description:
        "澳大利亚 Byron Bay 住宿型瑜伽中心，提供课程、冥想和素食餐饮。",
      tags: ["澳大利亚", "Byron Bay", "住宿课程"],
      access: "机构官网",
      languages: ["English"],
    },
    {
      title: "Bodhi Khaya Nature Retreat — South Africa",
      url: "https://www.bodhikhaya.com/",
      description:
        "南非西开普自然保护区内的静修中心，提供个人住宿与团体活动。",
      tags: ["南非", "自然保护区", "个人静修"],
      access: "机构官网",
      languages: ["English"],
    },
  ],
  "retreats-world/global-networks": [
    {
      title: "Ananda Retreat Centers",
      url: "https://www.ananda.org/retreats/",
      description:
        "官方入口汇集美国加州与意大利 Assisi 等静修中心及其课程。",
      tags: ["全球网络", "官方目录", "美国", "意大利"],
      access: "机构官网",
      languages: ["English"],
    },
    {
      title: "Integral Yoga International Centers",
      url: "https://iyta.org/directory/centers/",
      description:
        "Integral Yoga 官方中心目录，覆盖美洲、欧洲、亚洲和大洋洲。",
      tags: ["全球网络", "官方中心目录", "多洲"],
      access: "机构官网",
      languages: ["English"],
    },
    {
      title: "AHYMSIN Affiliated Centers",
      url: "https://www.ahymsin.org/centers/",
      description:
        "喜马拉雅瑜伽冥想协会官方关联中心目录，按各大洲分区列出机构。",
      tags: ["全球网络", "喜马拉雅传统", "官方目录"],
      access: "机构官网",
      languages: ["English"],
    },
  ],
};
