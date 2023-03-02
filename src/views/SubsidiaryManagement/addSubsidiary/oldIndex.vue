<template>
		<div >
				<el-container>
						<el-header>
								<div class="title">江西省水利信息管理系统</div>
								<el-button type="primary" @click="loginOut">退出</el-button>
						</el-header>
						<el-container>
								<el-aside width="200px"><Sidebar/></el-aside>
								<el-main>
										<el-row >
												<el-col :span="24"><el-button type="primary" @click="openInsert">新增子公司</el-button></el-col>
										</el-row>
										<el-row style="margin-top: 20px;">
												<el-col :span="24">
														<el-table
																:data="tableData"
																border
																style="width: 100%">
																<el-table-column
																		prop="uId"
																		label="编号"
																		width="50">
																</el-table-column>
																<el-table-column
																		prop="scName"
																		label="子公司名称"
																		width="120">
																</el-table-column>
																<el-table-column
																		prop="scMan"
																		label="联系人"
																		width="120">
																</el-table-column>
																<el-table-column
																		prop="scTel"
																		label="联系人电话"
																		width="120">
																</el-table-column>
																<el-table-column
																		prop="uId"
																		label="子公司管理员"
																		width="120">
																</el-table-column>
																<el-table-column
																		
																		label="子公司LOGO"
																		width="120">
																		
																		<template slot-scope="scope">
																				<img :src="scope.row.scLogo" @click="goTo(scope.row.scWebUrl)" style="width: 100px;height: 80px;">
																		</template>
																
																</el-table-column>
																</el-table-column>
																
																<el-table-column
																		label="操作"
																>
																		<template slot-scope="scope">
																				<el-button type="primary" size="small" @click="openNav(scope.row)">修改</el-button>
																				<el-button type="primary" size="small" @click="deleteDate(scope.row)">删除</el-button>
																				<el-button type="primary" size="small" @click="openPower(scope.row)">产品</el-button>
																		</template>
																</el-table-column>
														</el-table>
												</el-col>
										</el-row>
								
								
								
								
								</el-main>
						</el-container>
				
				</el-container>
				
				
				<el-dialog
						:title="comName"
						:visible.sync="dialogVisible2"
						width="70%"
				>
						<el-row >
								<el-col :span="24"><el-button type="primary" @click="openInsertProduct">新增产品</el-button></el-col>
						</el-row>
						<el-row style="margin-top: 20px;">
								<el-col :span="24">
										<el-table
												:data="tableDataProduct"
												border
												style="width: 100%">
												<el-table-column
														prop="pId"
														label="编号"
														width="100">
												</el-table-column>
												<el-table-column
														prop="pName"
														label="产品名称"
														width="100">
												</el-table-column>
												<el-table-column
														prop="pFalg"
														label="规格"
														width="100">
												</el-table-column>
												<el-table-column
														prop="pPrice"
														label="价格"
														width="100">
												</el-table-column>
												<el-table-column
														prop="pInfo"
														label="价格"
														width="100">
												</el-table-column>
												<el-table-column
														label="图片"
														width="150">
														<template slot-scope="scope">
																<img :src="scope.row.pImag" style="width: 100px;height: 80px;">
														</template>
												</el-table-column>
												<el-table-column
														label="操作"
												>
														<template slot-scope="scope">
																<el-button type="primary" size="small" @click="openNavProduct(scope.row)">修改</el-button>
																<el-button type="primary" size="small" @click="deleteDateProduct(scope.row)">删除</el-button>
														</template>
												</el-table-column>
										</el-table>
								</el-col>
						</el-row>
				</el-dialog>
				<el-dialog
						title="产品编辑"
						:visible.sync="dialogVisible4"
						width="50%"
						v-model="updateFormPrduct"
				>
						<el-form
						>
								<el-form-item  prop="uName" label="产品名称">
										<el-input  v-model="updateFormPrduct.pName"></el-input>
								</el-form-item>
								<el-form-item  label="规格">
										<el-input  v-model="updateFormPrduct.pFalg"></el-input>
								</el-form-item>
								<el-form-item  label="价格">
										<el-input  v-model="updateFormPrduct.pPrice"></el-input>
								</el-form-item>
								<el-form-item  label="说明">
										<el-input  v-model="updateFormPrduct.pInfo"></el-input>
								</el-form-item>
								<el-form-item  label="图片">
										
										
										<el-upload　
										　　action="http://localhost:9999/api/sonCom/getPic.php"
										:on-preview="handlePreview"
										:on-remove="handleRemove"
										　　:before-upload="beforeAvatarUpload"
										　　list-type="picture"
										>
										　　<el-button style="margin-top: 20px;">选择上传文件
										　　</el-button>
										</el-upload>
								
								</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="updateDateProduct" >提 交</el-button>
          </span>
				</el-dialog>
				<el-dialog
						title="子公司编辑"
						:visible.sync="dialogVisible1"
						width="50%"
						v-model="updateForm"
				>
						<el-form
						>
								<el-form-item  prop="uName" label="子公司名称">
										<el-input  v-model="updateForm.scName"></el-input>
								</el-form-item>
								<el-form-item  label="联系人">
										<el-input  v-model="updateForm.scMan"></el-input>
								</el-form-item>
								<el-form-item  label="联系人电话">
										<el-input  v-model="updateForm.scTel"></el-input>
								</el-form-item>
								<el-form-item  label="子公司管理员">
										<el-select v-model="updateForm.uId" placeholder="请选择">
												<el-option
														v-for="(item,index) in optionsuName"
														:key="index"
														:label="item.uName"
														:value="item.uId">
												</el-option>
										</el-select>
								</el-form-item>
								<el-form-item  label="子公司网址">
										<el-input  v-model="updateForm.scWebUrl"></el-input>
								</el-form-item>
								<el-form-item  label="Logo">
										
										
										<el-upload　
										　　action="http://localhost:9999/api/sonCom/getPic.php"
										:on-preview="handlePreview"
										:on-remove="handleRemove"
										　　:before-upload="beforeAvatarUpload"
										　　list-type="picture"
										>
										　　<el-button style="margin-top: 20px;">选择上传文件
										　　</el-button>
										</el-upload>
								
								</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="updateDate" >提 交</el-button>
          </span>
				</el-dialog>
				<el-dialog
						title="新增产品"
						:visible.sync="dialogVisible3"
						width="50%"
						v-model="inserFormProduct"
				>
						<el-form
						>
								<el-form-item  prop="uName" label="产品名称">
										<el-input  v-model="inserFormProduct.pName"></el-input>
								</el-form-item>
								<el-form-item  label="规格">
										<el-input  v-model="inserFormProduct.pFalg"></el-input>
								</el-form-item>
								<el-form-item  label="价格">
										<el-input  v-model="inserFormProduct.pPrice"></el-input>
								</el-form-item>
								<el-form-item  label="说明">
										<el-input  v-model="inserFormProduct.pInfo"></el-input>
								</el-form-item>
								<el-form-item  label="图片">
										
										
										<el-upload　
										　　action="http://localhost:9999/api/sonCom/getPic.php"
												:on-preview="handlePreview"
												:on-remove="handleRemove"
												:before-upload="beforeAvatarUpload"
										　　list-type="picture"
										>
										　　<el-button style="margin-top: 20px;">选择上传文件
										　　</el-button>
										</el-upload>
								
								</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="insertProduct">提 交</el-button>
          </span>
				</el-dialog>
				<el-dialog
						title="新增子公司"
						:visible.sync="dialogVisible"
						width="40%"
						v-model="inserForm"
				>
						<el-form
						>
								<el-form-item  prop="uName" label="子公司名称">
										<el-input  v-model="inserForm.scName"></el-input>
								</el-form-item>
								<el-form-item  label="联系人">
										<el-input  v-model="inserForm.scMan"></el-input>
								</el-form-item>
								<el-form-item  label="联系人电话">
										<el-input  v-model="inserForm.scTel"></el-input>
								</el-form-item>
								<el-form-item  label="子公司管理员">
										<el-select v-model="inserForm.uId" placeholder="请选择">
												<el-option
														v-for="(item,index) in optionsuName"
														:key="index"
														:label="item.uName"
														:value="item.uId">
												</el-option>
										</el-select>
								</el-form-item>
								<el-form-item  label="子公司网址">
										<el-input  v-model="inserForm.scWebUrl"></el-input>
								</el-form-item>
								<el-form-item  label="Logo">
										
										
										<el-upload　
										　　action="http://localhost:9999/api/sonCom/getPic.php"
												:on-preview="handlePreview"
												:on-remove="handleRemove"
										　　:before-upload="beforeAvatarUpload"
										　　list-type="picture"
										>
										　　<el-button style="margin-top: 20px;">选择上传文件
										　　</el-button>
										</el-upload>
								
								</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitBtn">提 交</el-button>
          </span>
				</el-dialog>
		</div>
</template>
<script>
import Sidebar from '@/components/Sidebar/index.vue'

import {getAllUsers,getOneUsers,addUsers,delUsers,updateUsers,usersPower} from '@/api/users'
import {getAllSC,addSC,delSC,updateSC} from '@/api/sonCom'
import {getAllProduct,addProduct,updateProduct,delProduct} from '@/api/scComProduct'

export default{
		name:"layout",
		components: {
				Sidebar
		},
		data() {
				return {
						//公司名称
						comName:'',
						//dialog
						dialogVisible4:false,
						dialogVisible3:false,
						dialogVisible2:false,
						dialogVisible1:false,
						dialogVisible: false,
						//子公司列表
						tableData: [],
						//产品列表
						tableDataProduct:[],
						//新增子公司
						inserForm:{
								scName :'',
								scMan :'',
								scTel:'',
								scWebUrl :'',
								uId:'',
								file:''
						},
						//新增产品
						inserFormProduct:{
								scId:'',
								pName:'',
								pPrice:'',
								pInfo:'' ,
								pFalg:''
								
						},
						//查询参数
						queryParams:{
								// 当前是第几页
								page: 1
						},
						//编辑子公司表单
						updateForm:{
						},
						//编辑产品
						updateFormPrduct:{
						},
						//下拉框 子公司管理员
						optionsuName:[],
						
						
						itemForm: {
								//编辑时数据
								token: 123456,
								user_name: '',
								head_img: ''
						},
						updateUrl:"http://localhost:9999/api/sonCom/getPic.php",
						multfileImg:"",
						imgPath:""
						
				}
		},
		methods:{
				goTo(scWebUrl){
						window.location.href="http://"+scWebUrl;
				},
				loginOut(){
						this.$router.replace('/')
				},
				//获取列表数据
				getData(){
						
						getAllSC().then((reponse)=>{
								this.tableData=reponse;
								reponse.forEach((v,i)=>{
										this.tableData[i].scLogo=`http://localhost:9999/api/upload/${v.scLogo}`
								})
								
								console.log(789,this.tableData);
						});
						getAllUsers(this.queryParams).then((res)=>{
								this.optionsuName=res;
						});
						getAllProduct().then((response)=>{
								this.tableDataProduct=response;
						})
						
				},
				// 打开编辑数据
				openNavProduct(row) {
						this.dialogVisible4 = true;
						this.updateFormPrduct=row;
				},
				updateDateProduct(){
						let url = "http://localhost:9999/api/getPic.php"
						let FormData = require("form-data"); //导入上传控件
						let fd = new FormData()
						fd.append('pId', this.updateFormPrduct.pId)
						fd.append('pFalg', this.updateFormPrduct.pFalg)
						fd.append('pName', this.updateFormPrduct.pName)
						fd.append('pInfo', this.updateFormPrduct.pInfo)
						fd.append('pPrice', this.updateFormPrduct.pPrice)
						fd.append('file', this.multfileImg) //传图片的
						updateProduct(fd).then((res)=>{
								this.getData();
						})
						this.dialogVisible4 = false;
				},
				// 打开编辑数据
				openNav(row) {
						this.dialogVisible1 = true;
						this.updateForm=row;
				},
				//提交编辑数据 发送请求
				updateDate(){
						let url = "http://localhost:9999/api/getPic.php"
						
						let FormData = require("form-data"); //导入上传控件
						let fd = new FormData()
						fd.append('scName', this.updateForm.scName)
						fd.append('scMan', this.updateForm.scMan)
						fd.append('scTel', this.updateForm.scTel)
						fd.append('scWebUrl',this.updateForm.scWebUrl)
						fd.append('uId', this.updateForm.uId)
						fd.append('file', this.multfileImg) //传图片的
						updateSC(fd,this.updateForm.scId).then((res)=>{
								this.getData();
						})
						
						this.dialogVisible1 = false;
				},
				
				//打开新增
				openInsert(){
						this.dialogVisible = true;
				},
				//打开产品
				openPower(row){
						this.dialogVisible2 = true;
						this.inserFormProduct.scId=row.scId;
						this.comName=row.scName+'的产品';
				},
				//打开产品新增
				openInsertProduct(){
						this.dialogVisible3 = true;
				},
				//提交新增产品
				insertProduct(){
						let url = "http://localhost:9999/api/getPic.php"
						let FormData = require("form-data"); //导入上传控件
						let fd = new FormData()
						fd.append('scId', this.inserFormProduct.scId)
						fd.append('pFalg', this.inserFormProduct.pFalg)
						fd.append('pName', this.inserFormProduct.pName)
						fd.append('pInfo', this.inserFormProduct.pInfo)
						fd.append('pPrice', this.inserFormProduct.pPrice)
						fd.append('file', this.multfileImg) //传图片的
						addProduct(fd).then((res)=>{
								this.getData();
						})
						this.dialogVisible3 = false;
				},
				//删除子公司数据
				deleteDate(row) {
						console.log(row.scId);
						this.$confirm('是否确认删除名称为"' + row.scId + '"的数据项?', "警告", {
								confirmButtonText: "确定",
								cancelButtonText: "取消",
								type: "warning",
						})
								.then(() => {
										return delSC(row.scId);
								})
								.then(() => {
										this.getData();
										this.msgSuccess("删除成功");
								})
								.catch((err) => {
										console.log(err);
								});
				},
				//删除产品数据
				deleteDateProduct(row) {
						console.log(row.pId);
						this.$confirm('是否确认删除名称为"' + row.pId + '"的数据项?', "警告", {
								confirmButtonText: "确定",
								cancelButtonText: "取消",
								type: "warning",
						})
								.then(() => {
										return delProduct(row.pId);
								})
								.then(() => {
										this.getData();
										this.msgSuccess("删除成功");
								})
								.catch((err) => {
										console.log(err);
								});
				},
				
				beforeAvatarUpload(file){ //上传
						this.multfileImg = file; //拿到文件的图片列表
						this.inserForm.file = file;
						console.log("-------")
						console.log(file)
						console.log("-------")
				},
				handlePreview(){},
				handleRemove(){}, //删除
				//提交新增子公司
				submitBtn(){
						let url = "http://localhost:9999/api/getPic.php"
						
						let FormData = require("form-data"); //导入上传控件
						let fd = new FormData() //创建formData 处理普通数据 图片数据
						fd.append('scName', this.inserForm.scName)
						fd.append('scMan', this.inserForm.scMan)
						fd.append('scTel', this.inserForm.scTel)
						fd.append('scWebUrl',this.inserForm.scWebUrl)
						fd.append('uId', this.inserForm.uId)
						
						fd.append('file', this.multfileImg) //传图片的
						addSC(fd).then((res)=>{
								this.getData();
						})
						this.dialogVisible = false;
				}
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
		},
		
		created(){
				this.getData();
		}
		
}
</script>

<style scoped>

</style>
