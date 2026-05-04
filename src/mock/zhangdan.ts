import { Transaction } from "@/types";

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 5000,
    type: 'income',
    categoryId: 'salary',
    remark: '10月工资',
    createTime: new Date('2025-10-01'),
    account: "微信余额",
    updateTime: new Date("2025-10-01")
  },
  {
    id: '2',
    amount: 32,
    type: 'expense',
    categoryId: 'food',
    remark: '早餐',
    createTime: new Date('2025-10-02'),
    updateTime: new Date('2025-10-02'),
    account: "微信余额"
  },
  {
    id: '3',
    amount: 128,
    type: 'expense',
    remark: "",
    categoryId: 'shopping',
    createTime: new Date('2025-10-02'),
    updateTime: new Date('2025-10-02'),
    account: ""
  },
  {
    id: '4',
    amount: 200,
    type: 'expense',
    categoryId: 'transport',
    remark: '地铁+打车',
    createTime: new Date('2025-10-03'),
    updateTime: new Date('2025-10-03'),
    account: ""
  },
  {
    id: '5',
    amount: 800,
    type: 'income',
    categoryId: 'parttime',
    remark: '兼职收入',
    createTime: new Date('2025-10-04'),
    updateTime: new Date('2025-10-03'),
    account: ""
  },
  {
    id: '6',
    amount: 45,
    type: 'expense',
    remark: '',
    categoryId: 'food',
    createTime: new Date('2025-10-05'),
    updateTime: new Date('2025-10-03'),
    account: ""
  },
  {
    id: '7',
    amount: 1200,
    type: 'expense',
    categoryId: 'rent',
    remark: '10月房租',
    createTime: new Date('2025-10-06'),
    updateTime: new Date('2025-10-03'),
    account: ""
  },
  {
    id: '8',
    amount: 68,
    type: 'expense',
    remark: '',
    categoryId: 'entertainment',
    createTime: new Date('2025-10-07'),
    updateTime: new Date('2025-10-03'),
    account: ""
  },
  {
    id: '9',
    amount: 2000,
    type: 'income',
    categoryId: 'bonus',
    remark: '季度奖金',
    createTime: new Date('2025-10-08'),
    updateTime: new Date('2025-10-03'),
    account: ""
  },
  {
    id: '10',
    amount: 59,
    type: 'expense',
    remark: '',
    categoryId: 'food',
    createTime: new Date('2025-10-09'),
    updateTime: new Date('2025-10-03'),
    account: ""
  },
  {
    id: '11',
    amount: 199,
    type: 'expense',
    categoryId: 'shopping',
    remark: '生活用品',
    createTime: new Date('2025-10-10'),
    updateTime: new Date('2025-10-03'),
    account: ""
  },
  {
    id: '12',
    amount: 35,
    type: 'expense',
    remark: '',
    categoryId: 'transport',
    createTime: new Date('2025-10-11'),
    updateTime: new Date('2025-10-03'),
    account: ""
  },
  {
    id: '13',
    amount: 128,
    type: 'expense',
    categoryId: 'dining',
    remark: '外卖午餐',
    createTime: new Date('2025-10-12'),
    updateTime: new Date('2025-10-03'),
    account: ""
  },
  {
    id: '14',
    amount: 500,
    type: 'income',
    remark: '',
    categoryId: 'investment',
    createTime: new Date('2025-10-13'),
    updateTime: new Date('2025-10-03'),
    account: ""
  },
  {
    id: '15',
    amount: 89,
    type: 'expense',
    remark: '',
    categoryId: 'food',
    createTime: new Date('2025-10-14'),
    updateTime: new Date('2025-10-03'),
    account: ""
  },
  {
    id: '16',
    amount: 299,
    type: 'expense',
    categoryId: 'shopping',
    remark: '买衣服',
    createTime: new Date('2025-10-15'),
    updateTime: new Date('2025-10-03'),
    account: ""
  },
  {
    id: '17',
    amount: 45,
    type: 'expense',
    remark: '',
    categoryId: 'transport',
    createTime: new Date('2025-10-16'),
    updateTime: new Date('2025-10-03'),
    account: ""
  },
  {
    id: '18',
    amount: 300,
    type: 'expense',
    categoryId: 'medical',
    remark: '买药',
    createTime: new Date('2025-10-17'),
    updateTime: new Date('2025-10-03'),
    account: ""
  },
  {
    id: '19',
    amount: 1200,
    type: 'income',
    categoryId: 'gift',
    remark: '礼金收入',
    createTime: new Date('2025-10-18'),
    updateTime: new Date('2025-10-03'),
    account: ""
  },
  {
    id: '20',
    amount: 78,
    type: 'expense',
    remark: '',
    categoryId: 'food',
    createTime: new Date('2025-10-19'),
    updateTime: new Date('2025-10-03'),
    account: ""
  },
]