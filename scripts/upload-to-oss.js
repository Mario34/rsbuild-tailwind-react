import OSS from 'ali-oss';
import { glob } from 'glob';
import chalk from 'chalk';
import minimist from 'minimist';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * 命令行参数
 * OSS_KEY: 对应OSS accessKeyId
 * OSS_SECRET: 对应OSS accessKeySecret
 * project: 项目打包目录（例子: dev-console）
 * isProduction: 是否为生产环境
 */
const argv = minimist(process.argv.slice(2));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new OSS({
  region: 'oss-cn-hangzhou',
  accessKeyId: argv.OSS_KEY,
  accessKeySecret: argv.OSS_SECRET,
  bucket: 'beicai-dev',
});

const ossRoot = `static/hyrule_${argv.isProduction ? 'pro' : 'dev'}_${argv.project}/`;
const distRoot = path.resolve(__dirname, '../packages/', argv.project, 'dist');
const QueueStep = 50;

async function main() {
  const files = glob.sync(path.join(distRoot, '/**/*.*'), {});
  console.time('upload');
  for (let i = 0; i < files.length; i += QueueStep) {
    const currentFiles = files.slice(i, i + QueueStep);
    await Promise.all(
      currentFiles.map((file) => {
        const fileName = file.slice(distRoot.length);
        return client.put(path.join(ossRoot, fileName), path.normalize(file));
      }),
    );
    currentFiles.forEach((file) => {
      console.log(chalk.green('success', file));
    });
  }
  console.timeEnd('upload');
}

main();
