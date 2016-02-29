/*------------------ FOR ENTITY --------------------*/
var ENTITY_OFFLINE       = 0;
var ENTITY_ONLINE        = 1;


/*------------------ FOR ENTITY_LOCK --------------------*/
var ENTITY_LOCK_ACTION    = 1;
var ENTITY_LOCK_MACHINE   = 2;
var ENTITY_LOCK_GROUP     = 3;
var ENTITY_LOCK_IP        = 4;


/*------------------ FOR IP --------------------*/
var IP_MASTER       = 0; // 主IP(外网;
var IP_SLAVE        = 1;
var IP_INTERNAL     = 2;


/*------------------ FOR IP_MAPPING --------------------*/
var MAPPING_ALL       = 1;
var MAPPING_PORT      = 2;
var MAPPING_YES       = 1;
var MAPPING_NO        = 0;


/*------------------ FOR ARRANGEMENT --------------------*/
var AREA_ARRANGEMENT   = 0;
var GROUP_ARRANGEMENT  = 1;

var AREA_ITEM_ENABLED   = 0;
var AREA_ITEM_DISABLED  = 1;


/*------------------ FOR CONFIG --------------------*/
var MACHINE_ADD       = 1;
var MACHINE_REPLACE   = 2;


/*------------------ FOR CONFIG --------------------*/
var PROJECT_NONE     = 0;

var PROJECT_MANUAL_SYNC     = 0;
var PROJECT_AUTO_SYNC     = 1;

var PROJECT_HIDE_MERGED     = 0;
var PROJECT_SHOW_MERGED     = 1;

var ENCODING_GBK      = 0;
var ENCODING_UTF8     = 1;

var GROUP_OFFLINE    = 0;
var GROUP_ONLINE     = 1;
var GROUP_MERGED     = 2;
var GROUP_UNLIMITED  = 3;

var MACHINE_NOT_DIRTY = 0;
var MACHINE_DIRTY     = 1;

var MACHINE_PHYSICAL  = 0;
var MACHINE_VIRTUAL   = 1;
var MACHINE_OUTSIDE   = 2;

var MACHINE_SERVICE_OFFLINE   = 0;
var MACHINE_SERVICE_ONLINE    = 1;

var ISP_OTHER        = 12;

var USE_GID           = 0;
var USE_GROUP_CODE    = 1;

var CONFIG_HOST       = 0;
var CONFIG_GROUP      = 1;
var CONFIG_PROJECT    = 2;
var CONFIG_CUSTOM     = 3;

// 参数等级
var PARAM_TPL         = 0;
var PARAM_CONFIGGROUP = 1;
var PARAM_GROUP       = 2;
var PARAM_PROJECT     = 3;

var VALUE_STRING      = 1;
var VALUE_EXP         = 3;
var VALUE_TIME        = 5;

var DATA_DISABLE      = 0;
var DATA_NORMAL       = 1;
var DATA_GLOBAL       = 2;

var SERVICE_SINGLE    = 0;
var SERVICE_GROUP     = 1;
var SERVICE_GLOBAL    = 2;

var ALONE_NONE        = 0;
var ALONE_GROUP       = 1;
var ALONE_GLOBAL      = 2;

var LOOP_NONE         = 0;
var LOOP_SERVICE     = -1;
var LOOP_GROUP       = -2;

var AREA_NORMAL       = 0;
var AREA_CHILD        = 1;

var ROLE_ROOT         = 1;
var ROLE_ADMIN        = 2;
var ROLE_SA           = 3;
var ROLE_DEV          = 4;
var ROLE_DUMP         = 5;
var ROLE_OP           = 7;

var ROLE_SA_DUTY       = 100;

var ALL_PROJECT = 0;
var ALARM_GROUP_ENABLED = 1;
var ALARM_GROUP_DISABLED = 0;

var TRIGGER_NORMAL    = 1;
var TRIGGER_AREA_CONF = 2;
var TRIGGER_PARAM_CONF = 3;
var TRIGGER_SPECIFAL = 1000;
var TRIGGER_CIDR     = 1000;

/*------------------ FOR SVN --------------------*/
var SVN_NONE      = 0;
var SVN_READ       = 1;
var SVN_RW       = 2;

var SVN_VALID      = 0;
var SVN_DIRTY      = 1;

var CORP_SUFFIX = '@CORP.NETEASE.COM';
var AUTH_OLD_FILE = 'authz_old';
var AUTH_FILE = 'authz';


/*------------------ FOR PORT --------------------*/
var NETPROTOCOL_TCP     = 0;
var NETPROTOCOL_UDP     = 1;
var NETPROTOCOL_ALL     = 2;

var NETMONITOR_ALL     = 0;
var NETMONITOR_OUTER   = 1;
var NETMONITOR_INTRA   = 2;
var NETMONITOR_LOCAL   = 3;

var PORT_NORMAL   = 1;
var PORT_BASE     = 2;


/*------------------ FOR WORKFLOW --------------------*/
var SENDER        = 'galaxy@mesg.corp.netease.com';
var MAILDOMAIN    = '@corp.netease.com';
var SYSNAME       = '游戏运维平台';
var NEWLINE       = "\r\n";
var ADMINNAME     = '秦鹏';
var ADMINMAIL     = 'qinpeng@corp.netease.com';
var MAIL5555      = 'sa@corp.netease.com';

var POPO_APPLY_TITLE    = '[技术部][网管组]POPO群发送接口权限申请';
var POPO_APPLY_ADMIN    = 'zhouzhaochun@corp.netease.com';

var SOURCE_MACHINE   = 0;
var SOURCE_IP        = 1;

var DES_PROJECT   = 0;

var REC_MACHINE_CHANGE_PROJECT   = 0;
var DEV_APPLY_MACHINE            = 1;
var DEV_UPDATE_MACHINE           = 2;
var DEV_CHANGE_MACHINE           = 3;
var DEV_OP_MACHINE               = 4;
var DEV_RECYCLE_MACHINE          = 5;
var DEV_TORECYCLE_MACHINE        = 6;
var REC_IP_UPDATE                = 7;
var REC_ASSET_EXCHANGE           = 8;
var REC_MACHINE_OFFLINE          = 9;
var REC_IP_EXCHANGE             = 10;
var DEV_CONFIRM_MACHINE         = 11;
var REC_MACHINE_IMPORT          = 12;

var URGENCY_LOW      = 0;
var URGENCY_NORMAL   = 1;
var URGENCY_HIGH     = 2;

var APPLY_ACC    = 0;
var APPLY_WAIT   = 1;
var APPLY_REFUSE = 2;

var PROGRESS_NO = 0;
var PROGRESS_YES = 1;

var ASSET_USED    = 1;
var ASSET_STANDBY = 2;

var WORKFLOW_DETAIL_NUM   = 5;
var WORKFLOW_PAGE_NUM    = 20;

var WORKFLOW_REDMINE    = 1;
var WORKFLOW_FEEDBACK   = 2;









/*------------------ FOR DEV --------------------*/
var DEV_HISTORY  = 0;
var DEV_NOW      = 1;
var DEV_IDLE     = 2;
var DEV_EXCEED   = 3;

var DEV_NO_FLOW = 0;

//UPS标记
var DEV_UPS_NO  = 0;
var DEV_UPS_YES = 1;

//双电标记
var DOUBLE_POWER_NO  = 0;
var DOUBLE_POWER_YES = 1;

//地区标记
var AREA_MARK_UNKNOWN = 0;
var AREA_MARK_GZ      = 1;
var AREA_MARK_HZ      = 2;

//开发机死活检查
var DEV_STATE_UNKNOWN   = 0;
var DEV_STATE_ALIVE     = 1;
var DEV_STATE_DEAD      = 2;

//开发机确认状态
var DEV_NOT_CHECK       = 0;
var DEV_CONFIRM_CHECK   = 1;
var DEV_CONFIRM_YES     = 2;

//管理员地址
var SA_ADMIN_MAIL   = 'zhshen@corp.netease.com';

//标识开发机最多情况
var DEV_MAX   = 9999;

//标识运维模板生成文件路径
var OP_TEMPLATE = 'dev/mail/dev_maintain';

/*------------------ FOR ASSET_RECORD--------------------*/
var MOVE_IN    = 0;
var MOVE_OUT   = 1;
var MOVE_INDEPENDENT   = 2;

/*------------------ FOR WHITELIST--------------------*/
var PROJECT_WHITELIST  = 0;
var GLOBAL_WHITELIST   = 1;

var WHITELIST_GROUP        = 0;
var WHITELIST_CONFIGGROUP  = 1;

var WHITELIST_ALL        = 0;
var WHITELIST_SAME       = -1;


/*------------------ FOR XMLRPC --------------------*/
var RPC_DNS      = 9800;
var RPC_IP_CACHE = 8885;


/*------------------ FOR DUMP --------------------*/
var DUMP_VALID_TRUE   = 1;
var DUMP_VALID_FALSE  = 0;
var DUMP_PAGE_NUM    = 20;
var DUMP_DETAIL_NUM   = 5;
var DUMP_CYCLE_DISABLE = 0;

var DUMP_ONE_MONTH    = 30;
var DUMP_ONE_DAY    = 86400;
var DUMP_UTC_DIFF   = 8 * 3600;
var DUMP_INTERVAL    = 1800;

var PUPPET_PROD       = 0;
var PUPPET_TEST       = 1;
var PUPPET_DEVE       = 2;

var PUPPET_STATUS_UNKNOWN  = 0;
var PUPPET_STATUS_OK       = 1;
var PUPPET_STATUS_DISABLE  = 2;
var PUPPET_STATUS_OUTDATE  = 3;
var PUPPET_STATUS_ERROR    = 4;
var PUPPET_STATUS_UPDATE   = 5;

var DAY           = 86400;
var MONTH    = 30 * 86400;
var YEAR    = 365 * 86400;


var WARRANTY_NONE     = 0;
var WARRANTY_GOOD     = 1;
var WARRANTY_WARNING  = 2;
var WARRANTY_OUT      = 3;

var PAGE_NUM    = 20;

var DEFAULT_TIME_ZONE = '+8:00';


/*------------------ FOR MONITOR --------------------*/
var USER_MODIFIED    = -1;
var NAGIOS_NORMAL     = 0;
var NAGIOS_WARNING    = 1;
var NAGIOS_CRITICAL   = 2;

var MONITOR_ACTIVE    = 1;
var MONITOR_PASSIVE   = 2;

var MONITOR_STATUS_UNKNOWN  = 0;
var MONITOR_STATUS_OK       = 1;
var MONITOR_STATUS_ERROR    = 2;
var MONITOR_STATUS_OUTDATE  = 3;
var MONITOR_STATUS_DISABLE  = 4;

/*------------------ FOR ALARM --------------------*/
var ALARM_DEFAULT     = 0;
var ALARM_CAPTURE     = 1;
var ALARM_FORWARD     = 2;

var ALARM_NODE     = 0;
var ALARM_LEAF     = 1;
var ALARM_POLICIES = 2;

var ALARM_MERGE      = 1;
var ALARM_ALARM      = 2;
var ALARM_FILTER     = 3;
var ALARM_ACTION     = 4;
var ALARM_MOVE       = 5;
var ALARM_CALL       = 6;
var ALARM_NOTICE     = 7;
var ALARM_SET        = 8;

var ALARM_TRACE      = 1;

var ALARM_DEFAULT_MREGE_TYPE  = 'delay';
var ALARM_DEFAULT_MREGE_WINDOW  = 30;

var ALARM_DEFAULT_FILTER_TYPE = 'mask';
var ALARM_DEFAULT_FILTER_WINDOW = 30 * 60;

var ALARM_DEFAULT_ALARM_METHOD    = 'popo';

var ALARM_ANY_MATCH     = 1;
var ALARM_ONE_MATCH     = 2;
var ALARM_ALL_MATCH     = 3;

var ALARM_STATUS_NORMAL     = 0;
var ALARM_STATUS_DIRTY      = 1;
var ALARM_STATUS_NEW        = 2;
var ALARM_STATUS_DISABLED   = 4;
var ALARM_STATUS_REMOVED    = 8;

var ALARM_NO_PARENT       = -1;

var ALARM_GROUP_CUSTOM     = 0;

var ALARM_GLOBAL     = 0;


var ALARM_INVALID_DATA = '<strike>无效字段</strike>';

/*------------------ FOR REST  --------------------*/
var HTTP_OK           = 200;
var HTTP_CREATED      = 201;
var HTTP_REMOVED      = 204;
var HTTP_WARNNING     = 206;

// 字段错误, 头字段不支持, 非法路径
var HTTP_BAD_REQ      = 400;

var HTTP_UNAUTH       = 401;
// 验证失败, 权限不够
var HTTP_FORBIDDEN    = 403;

// 资源未找到
var HTTP_NOT_FOUND    = 404;

// 资源已存在、类型不匹配
var HTTP_CONFLICT     = 409;

// 内部错误、超时
var HTTP_SERV_ERROR   = 500;
// 服务器忙
var HTTP_SERV_BUSY   = 503;


/*------------------ FOR MODEL  --------------------*/

// 级联删除等
var CASCADE_UPDATE    = 1;
// 取消整个事务
var CASCADE_CANCEL    = 2;
// 忽略
var CASCADE_IGNORE    = 3;


var ERROR_UNKNOWN         = 10000;
var ERROR_DB_EXEC         = 10001;
var ERROR_PHP_ERROR       = 10002;
var ERROR_NOT_EXIST       = 10003;
var ERROR_EXIST           = 10004;
var ERROR_PROJECT         = 10005;
var ERROR_USER            = 10006;
var ERROR_CASCADE_CANCEL  = 20000;
var ERROR_INVALID_DATA    = 30000;
var ERROR_INVALID_METHOD  = 30001;
var ERROR_WRITE_FILE      = 40000;
var ERROR_SEND_MAIL       = 40001;
var ERROR_XML_RPC         = 40002;
var ERROR_COMPLEX         = 50000;



/*------------------ FOR OCEAN--------------------*/
var OCEAN_MACHINE_SVM         = 0;
var OCEAN_MACHINE_LVM         = 1;
var OCEAN_MACHINE_TVM         = 2;
var OCEAN_MACHINE_CVM         = 3;
var OCEAN_MACHINE_TCVM         = 4;
var OCEAN_MACHINE_SVM2         = 5;

var GROUP_CONFIG_TEST         = 0;
var GROUP_CONFIG_NORMAL       = 1;
var GROUP_RS_TEST             = 2;
var GROUP_RS_NORMAL           = 3;
var GROUP_RS_LARGE            = 4;
var GROUP_RS_SUPER            = 5;
var GROUP_RESOURCE_MANAGER    = 6;


var GID_RS                    = 10000;
var GID_CONFIG                = 20000;
var GID_RS_TEST               = 30000;
var GID_CONFIG_TEST           = 40000;
var GID_RESOURCE              = 80000;
var MIGRATE_FROM              = 'migrate_from';
var MIGRATE_FROM_DESCRIPTION  = '迁移集群的gid';

var KEYFILE                   = 'keyfile';
var KEYFILE_DESCRIPTION       = 'keyfile内容';

/*------------------ FOR CC--------------------*/
var CC_PID                    = '21';

var GROUP_STATUS_OPTIONS = [
    {id: 1,  label: '在线',  style: 'primary'},
    {id: 0,  label: '离线',  style: 'default'},
    {id: 2,  label: '合服',  style: 'warning', disabled: true},
];

var FALSE = 0;
var TRUE = 1;
var TRUE_FALSE_OPTIONS = [
    {id: 0,    label: '否',  style: 'default'},
    {id: 1,    label: '是',  style: 'primary'},
];

var PARAM_LEVEL_OPTIONS = [
    {id: PARAM_TPL,  label: '配置模板'},
    {id: PARAM_CONFIGGROUP,  label: '配置组'},
    {id: PARAM_GROUP,  label: '群组'},
    {id: PARAM_PROJECT,  label: '项目'},
];

var PARAM_TYPE_OPTIONS = [
    {id: 1,  label: '字面值'},
    {id: 3,  label: '表达式'},
    {id: 5,  label: '时间转时间戳'},
];

var CONFIGTPL_TYPE_OPTIONS = [
    {id: CONFIG_HOST,  label: '机器配置',  style: 'default'},
    {id: CONFIG_GROUP,  label: '群组配置',  style: 'default'},
    {id: CONFIG_PROJECT,  label: '项目配置',  style: 'default'},
    {id: CONFIG_CUSTOM,  label: '自定义配置',  style: 'default'},
];

var SERVICE_TYPE_OPTIONS = [
    {id: SERVICE_SINGLE,  label: '群组唯一',  style: 'success'},
    {id: SERVICE_GROUP,   label: '群组多个',  style: 'primary'},
    {id: SERVICE_GLOBAL,  label: '全局',      style: 'danger'},
];

var SERVICE_ALONE_OPTIONS = [
    {id: ALONE_NONE,    label: '无',        style: 'default'},
    {id: ALONE_GROUP,   label: '群组',      style: 'primary'},
    {id: ALONE_GLOBAL,  label: '全局',      style: 'danger'},
];


var ENCODING_OPTIONS = [
    {id: ENCODING_GBK,   label: 'GBK',   style: 'success'},
    {id: ENCODING_UTF8,  label: 'UTF8',  style: 'danger'},
];

var PUPPET_ENV_OPTIONS = [
    {id: PUPPET_PROD,   label: 'PP',   style: 'success'},
    {id: PUPPET_TEST,   label: 'PT',   style: 'success'},
    {id: PUPPET_DEVE,   label: 'PD',   style: 'success'},
];

var PUPPET_STATUS_OPTIONS = [
    {id: PUPPET_STATUS_UNKNOWN, label: 'P', style: 'default'},
    {id: PUPPET_STATUS_OK,      label: 'P', style: 'info'},
    {id: PUPPET_STATUS_ERROR,   label: 'P', style: 'danger'},
    {id: PUPPET_STATUS_OUTDATE, label: 'P', style: 'warning'},
    {id: PUPPET_STATUS_DISABLE, label: 'P', style: 'disable'},
    {id: PUPPET_STATUS_UPDATE,  label: 'P', style: 'success'},
];

var MONITOR_STATUS_OPTIONS = [
    {id: MONITOR_STATUS_UNKNOWN, label: 'M', style: 'default'},
    {id: MONITOR_STATUS_OK,      label: 'M', style: 'info'},
    {id: MONITOR_STATUS_ERROR,   label: 'M', style: 'danger'},
    {id: MONITOR_STATUS_OUTDATE, label: 'M', style: 'warning'},
];


var RAID_LEVEL_OPTIONS = {
    'Primary-0, Secondary-0, RAID Level Qualifier-0' : 'RAID-0',
    'Primary-1, Secondary-0, RAID Level Qualifier-0' : 'RAID-1',
    'Primary-5, Secondary-0, RAID Level Qualifier-3' : 'RAID-5',
    'Primary-6, Secondary-0, RAID Level Qualifier-3' : 'RAID-6',
    'Primary-1, Secondary-3, RAID Level Qualifier-0' : 'RAID-10',
}

var ISP_OPTIONS = [
    {id: 0,  label: '无'},
    {id: 1,  label: '电信'},
    {id: 2,  label: '联通'},
    {id: 3,  label: '教育'},
    {id: 4,  label: 'BGP'},
    {id: 6,  label: '广州办公网', scope: 'machines'},
    {id: 7,  label: '机房内网', scope: 'machines'},
    {id: 8,  label: '移动', scope: 'machines'},
    {id: 9,  label: 'EC2', scope: 'machines'},
    {id: 11, label: '海外', scope: 'machines'},
];


var TIMEZONE_OPTIONS = [
    {id: '+8:00', label: 'CST 中国北京时间 GMT+8:00'},
    {id: '-11:00', label: 'MIT 中途岛时间 GMT-11:00'},
    {id: '-10:00', label: 'HST 夏威夷标准时间 GMT-10:00'},
    {id: '-9:00', label: 'AST 阿拉斯加标准时间 GMT-9:00'},
    {id: '-8:00', label: 'PST 太平洋标准时间 GMT-8:00'},
    {id: '-7:00', label: 'MST/PNT 西部山脉/菲尼克斯标准时间 GMT-7:00'},
    {id: '-6:00', label: 'CST 中部标准时间 GMT-6:00'},
    {id: '-5:00', label: 'IET 印第安那东部标准时间 GMT-5:00'},
    {id: '-5:00', label: 'EST 东部标准时间 GMT-5:00'}, 
    {id: '-4:00', label: 'PRT 波多黎各和美属维尔京群岛时间 GMT-4:00'},
    {id: '-3:30', label: 'CNT 加拿大纽芬兰时间 GMT-3:30'},
    {id: '-3:00', label: 'AGT/BET 巴西东部/阿根廷标准时间 GMT-3:00'},
    {id: '-1:00', label: 'CAT 中非时间 GMT-1:00'},
    {id: '+0:00', label: 'GMT 格林威治标准时间 GMT+0:00'},
    {id: '+1:00', label: 'ECT 欧洲中部时间 GMT+1:00'},
    {id: '+2:00', label: 'EET/ART 东欧/埃及标准时间 GMT+2:00'},
    {id: '+3:00', label: 'EAT 东非时间 GMT+3:00'},
    {id: '+3:30', label: 'MET 中东时间 GMT+3:30'},
    {id: '+4:00', label: 'NET 近东时间 GMT+4:00'},
    {id: '+5:00', label: 'PLT 巴基斯坦拉合尔时间 GMT+5:00'},
    {id: '+5:30', label: 'IST 印度标准时间 GMT+5:30'},
    {id: '+6:00', label: 'BST 孟加拉国标准时间 GMT+6:00'},
    {id: '+7:00', label: 'VST 越南标准时间 GMT+7:00'},
    {id: '+9:00', label: 'JST 日本标准时间 GMT+9:00'},
    {id: '+9:30', label: 'ACT 澳大利亚中部时间 GMT+9:30'},
    {id: '+10:00', label: 'AET 澳大利亚东部时间 GMT+10:00'},
    {id: '+11:00', label: 'SST 所罗门标准时间 GMT+11:00'},
    {id: '+12:00', label: 'NST 新西兰标准时间 GMT+12:00'},
];

var PORT_TYPE_OPTIONS = [
    {id: 0, label: '不限', style: 'primary'},
    {id: 1, label: '普通', style: 'primary'},
    {id: 2, label: '基础', style: 'primary'},
];

var PROTO_TYPE_OPTIONS = [
    {id: 0, label: 'tcp', style: 'primary'},
    {id: 1, label: 'udp', style: 'primary'},
    {id: 2, label: '所有', style: 'primary'},
];

var PORT_ADDR_OPTIONS = [
    {id: 0, label: '全部', style: 'danger'},
    {id: 1, label: '外网', style: 'danger'},
    {id: 2, label: '内网', style: 'danger'},
    {id: 3, label: '本地', style: 'danger'},
];

var WHITELIST_CROSS_PROJECT_OPTIONS = [
    {id: 0, label: '同项目', style: 'danger'},
    {id: 1, label: '全局', style: 'danger'},
];


var WHITELIST_GROUP_STATUS_OPTIONS = [
    {id: 3,  label: '不限',  style: 'default'},
    {id: 1,  label: '在线',  style: 'primary'},
    {id: 0,  label: '离线',  style: 'default'},
    {id: 2,  label: '合服',  style: 'warning', disabled: true},
];

var LINK_STATUS_OPTIONS = [
    {id: '1', label: '正常', style: 'primary'},
    {id: '5', label: '警告', style: 'warning'},
    {id: '9', label: '严重', style: 'danger'},
];

var NETMONITOR_IS_FOREIGN_OPTIONS = [
    {id: '0', label: '国内'},
    {id: '1', label: '国外'},
];

var NETMONITRO_IS_OSPF_OPTIONS = [
    {id: '0', label: '实际物理链接'},
    {id: '1', label: 'OSPF链接'},
];

var NETMONITRO_TIME_OPTIONS = [
    {id: '1', label: '现在'},
    {id: '2', label: '3小时前'},
    {id: '3', label: '6小时前'},
    {id: '4', label: '12小时前'},
    {id: '5', label: '24小时前'},
    {id: '$99', label: '自定义'},
];


/************************** appdump ***************************/
var ISSUE_STATUS_OPTIONS = [
    {id: '1', label: 'OPEN', style: 'primary'},
    {id: '0', label: 'CLOSE', style: 'danger'},
];

var OS_TYPE_OPTIONS = [
    {id: 'ios', label: 'ios', style: 'primary'},
    {id: 'android', label: 'android', style: 'info'},
];

var ERROR_TYPE_OPTIONS = [
    {id: 'ANDROID_JAVA_EXCEPTION', label: 'ANDROID_JAVA_EXCEPTION'},
    {id: 'ANDROID_NATIVE_ERROR', label: 'ANDROID_NATIVE_ERROR'},
    {id: 'ANDROID_ANR', label: 'ANDROID_ANR'},
    {id: 'SCRIPT_ERROR', label: 'SCRIPT_ERROR'},
    {id: 'IOS_OBJC_EXCEPTION', label: 'IOS_OBJC_EXCEPTION'},
    {id: 'IOS_NATIVE_ERROR', label: 'IOS_NATIVE_ERROR'},
    {id: 'IOS_ANR', label: 'IOS_ANR'},
    {id: 'U3D_ERROR', label: 'U3D_ERROR'},
    {id: 'OTHER', label: 'OTHER'},
];

var TIME_OPTIONS = [
    {id: 1, label: 'LAST_1_HOUR'},
    {id: 2, label: 'LAST_6_HOURS'},
    {id: 3, label: 'LAST_12_HOURS'},
    {id: 4, label: 'LAST_24_HOURS'},
    {id: 5, label: 'LAST_7_DAYS'},
    {id: 6, label: 'LAST_15_DAYS'},
    {id: 7, label: 'LAST_30_DAYS'},
    {id: '$99', label: 'CUSTOMIZE'},
];

var TAG_OPTIONS = [
    {id: 'and', label: 'and'},
    {id: 'or', label: 'or'},
];

var PERSONNEL_OPTIONS = [
    {id: 'view', label: 'APPDUMP_MEMBER'},
    {id: 'admin', label: 'APPDUMP_ADMIN'},
];

var AND_IS_ROOT = [
    {id: '1', label: 'YES'},
    {id: '0', label: 'NO'},
    {id: '2', label: 'Unknown'},
];

var AND_WITH_SD_CARD= [
    {id: '1', label: 'YES'},
    {id: '0', label: 'NO'},
    {id: '2', label: 'Unknown'},
];

var IOS_IS_JAIL = [
    {id: '1', label: 'YES'},
    {id: '0', label: 'NO'},
    {id: '2', label: 'Unknown'},
];

var DEFAULT_COUNTDOWN = 0;


var COLORS = [
    '#73BAD6',
    '#82C15E',
    '#E0A833',
    '#882A26',
    '#2E3673',
    'red',
    'cyan',
    'green',
    'yellow',
    "#00ffff",
    "#f0ffff",
    "#f5f5dc",
    "#000000",
    "#0000ff",
    "#a52a2a",
    "#00ffff",
    "#00008b",
    "#008b8b",
    "#a9a9a9",
    "#006400",
    "#bdb76b",
    "#8b008b",
    "#556b2f",
    "#ff8c00",
    "#9932cc",
    "#8b0000",
    "#e9967a",
    "#9400d3",
    "#ff00ff",
    "#ffd700",
    "#008000",
    "#4b0082",
    "#f0e68c",
    "#add8e6",
    "#e0ffff",
    "#90ee90",
    "#d3d3d3",
    "#ffb6c1",
    "#ffffe0",
    "#00ff00",
    "#ff00ff",
    "#800000",
    "#000080",
    "#808000",
    "#ffa500",
    "#ffc0cb",
    "#800080",
    "#800080",
    "#ff0000",
    "#c0c0c0",
    "#ffffff",
    "#ffff00",
];

/*------------------ FOR aladdin --------------------*/
var ALADDIN_STATUS_OPTIONS = [
    {id: 'PRE_CONFIRM', label: 'PRE_CONFIRM', style: 'warning'},
    {id: 'POST_CONFIRM', label: 'POST_CONFIRM', style: 'warning'},

    {id: 'PAUSED', label: 'PAUSED', style: 'default'},
    {id: 'STOPPED', label: 'STOPPED', style: 'default'},

    {id: 'FATAL', label: 'FATAL', style: 'danger'},
    {id: 'ERROR', label: 'ERROR', style: 'danger'},

    {id: 'WAITING', label: 'WAITING', style: 'warning'},
    {id: 'CANCELED', label: 'CANCELED', style: 'default'},

    {id: 'READY', label: 'READY', style: 'success'},
    {id: 'RUNNING', label: 'RUNNING', style: 'primary'},
    {id: 'DONE', label: 'DONE', style: 'info'},
    {id: null, label: 'NEW', style: 'default'},
]

ALADDIN_PARALLEL = 2;
ALADDIN_SERIAL = 1;

ALADDIN_RESOURCE_GROUP = 1;
ALADDIN_RESOURCE_CFG = 2;
ALADDIN_RESOURCE_TAG = 4;
ALADDIN_RESOURCE_AREA = 8;
ALADDIN_RESOURCE_SERVER = 32;

ALADDIN_LIST_CLUSTER = 1;
ALADDIN_LIST_SERVER = 2;

ALADDIN_SYNC_GALAXY = 1;
ALADDIN_SYNC_CBC = 2;

var ALADDIN_RESOURCE_OPTIONS = [
    /*{id: ALADDIN_RESOURCE_GROUP,
        label: '群组-GID', model: 'galaxy/groups', key: 'gid', info: 'groupName'},*/
    {id: ALADDIN_RESOURCE_CFG,
        label: '配置组', model: 'galaxy/configgroups', key: 'configgroupName'},
    {id: ALADDIN_RESOURCE_TAG,
        label: '群组-TAG', model: 'galaxy/tags', key: 'tagName'},
    {id: ALADDIN_RESOURCE_AREA,
        label: '分区', model: 'galaxy/areas', key: 'areaId', info: 'areaName'},
    /*
    {id: ALADDIN_RESOURCE_SERVER,
        label: '机器', model: 'galaxy/machines', key: 'ip', info: 'name'},
    */
]

