import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Grid, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import styles from "./EditTaskForm.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTask } from "../../../store/taskSlice";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditTaskForm = ({ handleClose, open, item }) => {
  const [formData, setFormData] = useState({
    title: item.title,
    image: item.image,
    description: item.description,
    tags: [],
    deadline: null,
  });

  const [selectedTag, setSelectedTag] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagChange = (e, value) => {
    console.log("tags ", value);
    setSelectedTag(value);
    setFormData({ ...formData, tags: value });
  };

  const handleDeadLineChange = () => {
    const date = new Date();
    setFormData({ ...formData, deadline: date });
  };

  const formatDate = (input) => {
    let {
      $y: year,
      $M: month,
      $D: day,
      $H: hour,
      $m: minute,
      $s: second,
      $ms: millisecond,
    } = input;
    const date = new Date(year, month, day, hour, minute, second, millisecond);
    const formatedDate = date.toISOString();
    return formatedDate;
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.deadline);
    if (formData.deadline != null) {
      formData.deadline = formatDate(formData.deadline);
    }
    dispatch(updateTask({ taskId: item.id, taskData: formData }));
    console.log(formData);

    handleClose();
  };

  return (
    <div className={""}>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} alignItems={"center"}>
                <Grid item xs={12}>
                  <TextField
                    label="Title"
                    fullWidth
                    name="title"
                    value={formData.title}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Image"
                    fullWidth
                    name="image"
                    value={formData.image}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    id="multiple limit tags"
                    options={tags}
                    // disableCloseOnSelect
                    onChange={handleTagChange}
                    getOptionLabel={(option) => option}
                    // renderOption={(props, option, { selected }) => (
                    //   <li {...props}>
                    //     <Checkbox
                    //       icon={icon}
                    //       checkedIcon={checkedIcon}
                    //       style={{ marginRight: 8 }}
                    //       checked={selected}
                    //     />
                    //     {option.title}
                    //   </li>
                    // )}
                    // style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tags"
                        placeholder="Technology used"
                        name="tags"
                        fullWidth
                        // value={"abs"}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      className="w-full"
                      label="Deadline"
                      renderInput={(params) => <TextField {...params} />}
                      onChange={handleDeadLineChange}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    sx={{ padding: "0.9rem" }}
                    className={styles.customButton}
                    type="submit"
                  >
                    Update Task
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};
export default EditTaskForm;

const tags = [
  "React",
  "Angular",
  "Java",
  "Spring Boot",
  "Node js",
  "Pythons",
  "Docker",
  "Jenkins",
  "AWS",
];
