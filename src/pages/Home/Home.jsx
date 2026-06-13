import ProductCard from '@/components/ProductCard';

const products = [
  {
    id: 'c2c09e7c-04e3-423e-9e66-033f7406f553',
    imageUrl: null,
    name: '에뛰드 루키루키 립스틱 #RD302',
    price: 12000,
    stock: 5,
  },
  {
    id: '50261540-0a3c-4992-a62c-8aa857d34d47',
    imageUrl: null,
    name: '맥 립스틱 #레트로',
    price: 38000,
    stock: 80,
  },
  {
    id: '16ac79a6-b57e-49f1-965e-45dfee572d86',
    imageUrl: null,
    name: '라네즈 립 슬리핑 마스크',
    price: 17000,
    stock: 200,
  },
  {
    id: '806f6a47-a2bd-4f3a-9336-1b28ea895369',
    imageUrl: null,
    name: '클리오 버터 립 글로우 #01',
    price: 11000,
    stock: 130,
  },
  {
    id: '7948f7a8-b60e-4616-88b9-773b4f37f72c',
    imageUrl: null,
    name: '클리오 킬래쉬 마스카라',
    price: 16000,
    stock: 8,
  },
  {
    id: '352a9022-33e9-4bee-aeb1-bfcc1a573b26',
    imageUrl: null,
    name: '헤라 블랙 파운데이션 아이라이너',
    price: 19000,
    stock: 90,
  },
  {
    id: 'cf0a31c0-4fd5-4a74-84fb-dd9ce2fe21d1',
    imageUrl: null,
    name: '에뛰드 플레이 컬러 아이즈 #피치팜',
    price: 18000,
    stock: 70,
  },
  {
    id: '9edee829-26ce-436c-8983-3b5c20d2db16',
    imageUrl: null,
    name: '부르조아 볼륨 글라무르 마스카라',
    price: 14000,
    stock: 110,
  },
  {
    id: '1432c69c-9da9-4593-a202-435c95674f26',
    imageUrl: null,
    name: '나스 아이섀도 팔레트 #언더그라운드',
    price: 68000,
    stock: 40,
  },
  {
    id: '1ef3dc34-69cf-402f-a1b3-727fd30deb4d',
    imageUrl: null,
    name: '헤라 블랙 쿠션 SPF34 #21C',
    price: 55000,
    stock: 60,
  },
  {
    id: '01e6a18c-4120-4479-8a0b-296ccfa4e159',
    imageUrl: null,
    name: '미샤 M 퍼펙트 커버 비비크림 #23',
    price: 9900,
    stock: 180,
  },
  {
    id: '2d54babe-c198-46d4-b37f-0da80f7f7b25',
    imageUrl: null,
    name: '나스 내추럴 래디언트 파운데이션 #시러큐스',
    price: 72000,
    stock: 50,
  },
  {
    id: '84bfcae9-892b-4f33-b939-526d82ea85b2',
    imageUrl: null,
    name: '맥 스튜디오 픽스 파우더 #NC25',
    price: 45000,
    stock: 7,
  },
  {
    id: '72ad5c4f-7166-4f89-bcb7-c69244afd08f',
    imageUrl: null,
    name: '클리오 킬 커버 파운웨어 쿠션 #03',
    price: 28000,
    stock: 95,
  },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-light text-gray-900">전체 상품</h1>
        <span className="text-sm text-gray-400">{products.length}개</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
