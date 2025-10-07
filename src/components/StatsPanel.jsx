import { useContext } from 'react';
import { motion as Motion} from 'framer-motion';
import { TodoContext } from '../Context/TodoContext';
import { Trophy, Star, Flame, Target } from 'lucide-react';

const StatsPanel = () => {
  const { userStats } = useContext(TodoContext);

  const getBadgeInfo = (badgeId) => {
    const badges = {
      'first-todo': { name: 'البداية', icon: Star, color: 'text-yellow-500' },
      'ten-todos': { name: 'المثابر', icon: Trophy, color: 'text-blue-500' },
      'week-streak': { name: 'الأسبوع الذهبي', icon: Flame, color: 'text-orange-500' }
    };
    return badges[badgeId] || { name: badgeId, icon: Star, color: 'text-gray-500' };
  };

  const progressToNextLevel = ((userStats.totalPoints % 100) / 100) * 100;

  return (
    <Motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur rounded-xl p-4 mb-6 border border-white/20"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {/* المستوى */}
        <Motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/80 rounded-lg p-3 text-center"
        >
          <div className="text-2xl font-bold text-purple-600">{userStats.level}</div>
          <div className="text-sm text-gray-600">المستوى</div>
        </Motion.div>

        {/* النقاط */}
        <Motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/80 rounded-lg p-3 text-center"
        >
          <div className="text-2xl font-bold text-blue-600">{userStats.totalPoints}</div>
          <div className="text-sm text-gray-600">النقاط</div>
        </Motion.div>

        {/* المهام المكتملة */}
        <Motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/80 rounded-lg p-3 text-center"
        >
          <div className="text-2xl font-bold text-green-600">{userStats.completedTodos}</div>
          <div className="text-sm text-gray-600">مهام مكتملة</div>
        </Motion.div>

        {/* السلسلة */}
        <Motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/80 rounded-lg p-3 text-center"
        >
          <div className="flex items-center justify-center gap-1">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-2xl font-bold text-orange-600">{userStats.streak}</span>
          </div>
          <div className="text-sm text-gray-600">أيام متتالية</div>
        </Motion.div>
      </div>

      {/* شريط التقدم للمستوى التالي */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">التقدم للمستوى التالي</span>
          <span className="text-sm font-medium text-purple-600">
            {userStats.totalPoints % 100}/100
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <Motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressToNextLevel}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
          />
        </div>
      </div>

      {/* الشارات */}
      {userStats.badges.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">الشارات المكتسبة</h3>
          <div className="flex gap-2 flex-wrap">
            {userStats.badges.map((badgeId, index) => {
              const badge = getBadgeInfo(badgeId);
              const IconComponent = badge.icon;
              return (
                <Motion.div
                  key={badgeId}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 rounded-lg p-2 flex items-center gap-2"
                  title={badge.name}
                >
                  <IconComponent className={`w-4 h-4 ${badge.color}`} />
                  <span className="text-xs font-medium">{badge.name}</span>
                </Motion.div>
              );
            })}
          </div>
        </div>
      )}
    </Motion.div>
  );
};

export default StatsPanel;